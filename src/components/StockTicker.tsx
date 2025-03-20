import React, { useEffect, useState, useCallback } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockItem {
  symbol: string;
  price: number;
  change: number;
  loading?: boolean;
  error?: boolean;
  lastUpdated?: Date;
}

// Lista de símbolos que queremos mostrar
const stockSymbols = [
  // Índices principales
  'SPY', // S&P 500 ETF
  'QQQ', // NASDAQ ETF
  'DIA', // Dow Jones ETF
  'IBEX.MC', // IBEX 35 (Madrid)
  'DAX', // DAX (Alemania)
  'N225', // Nikkei 225 (Japón)
  
  // Tecnología
  'AAPL', 
  'MSFT', 
  'AMZN', 
  'META', 
  'GOOG', 
  'NFLX', 
  'TSLA', 
  'NVDA', 
  'AMD',
  
  // Finanzas
  'JPM', 
  'BAC', 
  'GS',
  'BNP.PA', // BNP Paribas (París)
  'HSBA.L', // HSBC (Londres)
  
  // Otros sectores
  'DIS', 
  'KO',
  'PFE',
  'WMT',
  'BABA', // Alibaba
  'TM', // Toyota
  
  // Commodities (ETFs)
  'GLD', // Gold
  'USO', // Oil
  'SLV', // Silver
];

// Estado inicial con todos los símbolos marcados como cargando
const initialStocksState: StockItem[] = stockSymbols.map(symbol => ({
  symbol,
  price: 0,
  change: 0,
  loading: true,
  error: false
}));

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockItem[]>(initialStocksState);
  const [lastFullUpdate, setLastFullUpdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener datos de una acción desde Alpha Vantage
  const fetchStockData = useCallback(async (symbol: string): Promise<StockItem> => {
    try {
      // API key - reemplazar con tu propia API key
      const apiKey = 'demo'; // Reemplaza con tu API key de Alpha Vantage
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Verificar si tenemos datos válidos
      if (data['Global Quote'] && data['Global Quote']['05. price']) {
        const price = parseFloat(data['Global Quote']['05. price']);
        const change = parseFloat(data['Global Quote']['10. change percent'].replace('%', ''));
        
        return {
          symbol,
          price,
          change,
          loading: false,
          error: false,
          lastUpdated: new Date()
        };
      } else {
        console.error(`Error al obtener datos para ${symbol}:`, data);
        // Devolvemos un objeto que indica error para este símbolo
        return {
          symbol,
          price: 0,
          change: 0,
          loading: false,
          error: true
        };
      }
    } catch (error) {
      console.error(`Error en la solicitud para ${symbol}:`, error);
      return {
        symbol,
        price: 0,
        change: 0,
        loading: false,
        error: true
      };
    }
  }, []);

  // Función para cargar todos los datos de la API
  const loadAllStockData = useCallback(async () => {
    setIsLoading(true);
    console.log("Iniciando carga de datos de acciones...");
    
    // Crear una copia del estado actual para actualizaciones
    let updatedStocks = [...stocks];
    let successCount = 0;
    
    // Alpha Vantage tiene límites: 5 llamadas por minuto en su plan gratuito
    // Procesamos en lotes para respetar esos límites
    const batchSize = 5;
    
    for (let i = 0; i < stockSymbols.length; i += batchSize) {
      const batch = stockSymbols.slice(i, i + batchSize);
      console.log(`Procesando lote de símbolos ${i + 1} a ${Math.min(i + batchSize, stockSymbols.length)}`);
      
      try {
        // Procesar este lote en paralelo
        const batchResults = await Promise.all(
          batch.map(async (symbol) => {
            return await fetchStockData(symbol);
          })
        );
        
        // Actualizar los stocks con resultados exitosos
        batchResults.forEach(result => {
          const index = updatedStocks.findIndex(s => s.symbol === result.symbol);
          if (index !== -1) {
            // Solo actualizar si obtuvimos datos exitosos o si es la primera carga (no había datos previos)
            const currentStock = updatedStocks[index];
            if (!result.error || (currentStock.loading && !currentStock.lastUpdated)) {
              updatedStocks[index] = result;
              if (!result.error) successCount++;
            }
            // Si hay error pero teníamos datos anteriores, mantenemos los datos anteriores
            // y solo actualizamos los flags de error/loading
            else if (result.error && currentStock.price > 0) {
              updatedStocks[index] = {
                ...currentStock,
                loading: false,
                error: false // No marcamos como error si tenemos datos previos
              };
            }
          }
        });
        
        // Actualizar el estado después de cada lote
        setStocks([...updatedStocks]);
        
        // Esperar 15 segundos antes del siguiente lote para respetar los límites de la API
        if (i + batchSize < stockSymbols.length) {
          console.log("Esperando 15 segundos para el siguiente lote...");
          await new Promise(resolve => setTimeout(resolve, 15000));
        }
      } catch (error) {
        console.error("Error procesando lote:", error);
      }
    }
    
    console.log(`Carga de datos completada. ${successCount} símbolos actualizados exitosamente.`);
    setLastFullUpdate(new Date());
    setIsLoading(false);
  }, [stocks, fetchStockData]);

  // Cargar datos inicialmente y configurar actualizaciones
  useEffect(() => {
    // Carga inicial
    loadAllStockData();
    
    // Actualizar cada 5 minutos
    const updateInterval = setInterval(() => {
      loadAllStockData();
    }, 5 * 60 * 1000); // 5 minutos en milisegundos
    
    return () => clearInterval(updateInterval);
  }, [loadAllStockData]);

  // Filtrar los stocks que tienen datos para mostrar (no en estado de carga inicial)
  const displayStocks = stocks.filter(stock => !stock.loading || stock.price > 0);
  
  // Duplicar para efecto de scroll infinito
  const repeatedStocks = [...displayStocks, ...displayStocks, ...displayStocks];

  return (
    <div className="w-full bg-navy/10 text-sm py-2 overflow-hidden border-t border-navy/20">
      <div className="ticker-container">
        {/* Usamos la clase ticker-wrapper con velocidad reducida a 120s para movimiento más lento */}
        <div 
          className="ticker-wrapper"
          style={{ animation: 'ticker 120s linear infinite' }} // Ticker muy lento (2 minutos)
        >
          {repeatedStocks.map((stock, index) => (
            <div 
              key={`stock-${index}`} 
              className={`inline-flex items-center mx-4 whitespace-nowrap ${
                stock.loading ? 'opacity-60' : 
                stock.error ? 'opacity-60 text-muted-foreground' : ''
              }`}
            >
              <span className="font-semibold">{stock.symbol}:</span>
              <span className="ml-1">${stock.price.toFixed(2)}</span>
              <span 
                className={`ml-1 inline-flex items-center ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stock.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicador de última actualización */}
      <div className="flex justify-between items-center px-2 mt-1">
        <div className="text-xs text-muted-foreground">
          {isLoading ? 
            <span className="flex items-center">
              <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Actualizando datos...
            </span> 
            : 
            <span>
              {displayStocks.filter(s => !s.error).length} de {stockSymbols.length} valores cargados
            </span>
          }
        </div>
        {lastFullUpdate && (
          <div className="text-xs text-right text-muted-foreground">
            Actualizado: {lastFullUpdate.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockTicker;
