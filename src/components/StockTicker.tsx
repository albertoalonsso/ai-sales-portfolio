import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockItem {
  symbol: string;
  price: number;
  change: number;
  loading?: boolean;
  error?: boolean;
}

// Lista inicial de símbolos que queremos mostrar
const stockSymbols = [
  // Índices principales
  'SPY', // S&P 500 ETF
  'QQQ', // NASDAQ ETF
  'DIA', // Dow Jones ETF
  
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
  
  // Otros sectores
  'DIS', 
  'KO',
  'PFE',
  'WMT',
  
  // Commodities (ETFs)
  'GLD', // Gold
  'USO', // Oil
];

// Datos iniciales con estado de carga
const initialStocks: StockItem[] = stockSymbols.map(symbol => ({
  symbol,
  price: 0,
  change: 0,
  loading: true
}));

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockItem[]>(initialStocks);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Función para obtener datos de una acción desde Alpha Vantage
  const fetchStockData = async (symbol: string) => {
    try {
      // Usar demo API key para ejemplo - en producción necesitarás registrarte para una API key
      // https://www.alphavantage.co/support/#api-key
      const apiKey = 'PROZJOYY055KW3JL'; // Reemplazar con tu propia API key
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
          error: false
        };
      } else {
        console.error(`Error al obtener datos para ${symbol}:`, data);
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
  };

  // Cargar datos iniciales y configurar actualizaciones
  useEffect(() => {
    // Función para cargar todos los símbolos
    const loadAllStocks = async () => {
      // Alpha Vantage tiene límites estrictos en su plan gratuito (5 llamadas por minuto)
      // así que debemos espaciar las llamadas
      let updatedStocks: StockItem[] = [...stocks];
      
      // Para evitar superar los límites, procesamos 5 símbolos a la vez
      // con un retraso entre lotes
      const batchSize = 5;
      for (let i = 0; i < stockSymbols.length; i += batchSize) {
        const batch = stockSymbols.slice(i, i + batchSize);
        
        // Procesar este lote en paralelo
        const batchResults = await Promise.all(
          batch.map(async (symbol) => {
            return await fetchStockData(symbol);
          })
        );
        
        // Actualizar los stocks con los resultados de este lote
        batchResults.forEach(result => {
          const index = updatedStocks.findIndex(s => s.symbol === result.symbol);
          if (index !== -1) {
            updatedStocks[index] = result;
          }
        });
        
        // Actualizar el estado después de cada lote
        setStocks([...updatedStocks]);
        
        // Esperar 15 segundos antes del siguiente lote para respetar los límites de la API
        if (i + batchSize < stockSymbols.length) {
          await new Promise(resolve => setTimeout(resolve, 15000));
        }
      }
      
      // Guardar la hora de la última actualización
      setLastUpdated(new Date());
    };
    
    // Cargar datos inicialmente
    loadAllStocks();
    
    // Configurar una actualización cada 15 minutos (plan gratuito de Alpha Vantage)
    const updateInterval = setInterval(() => {
      loadAllStocks();
    }, 15 * 60 * 1000); // 15 minutos en milisegundos
    
    return () => clearInterval(updateInterval);
  }, []);

  // Para el ejemplo, usemos datos ficticios si hay error o está cargando
  const getDisplayStocks = () => {
    return stocks.map(stock => {
      if (stock.loading || stock.error) {
        // Generar datos ficticios temporalmente para los ítems que están cargando o con error
        const fallbackPrice = 100 + Math.random() * 200;
        const fallbackChange = (Math.random() * 4) - 2;
        
        return {
          ...stock,
          price: fallbackPrice,
          change: fallbackChange,
          // Si está cargando o tiene error, lo mostramos con un estilo diferente
        };
      }
      return stock;
    });
  };

  const displayStocks = getDisplayStocks();

  return (
    <div className="w-full bg-navy/10 text-sm py-2 overflow-hidden border-t border-navy/20">
      <div className="ticker-container">
        <div className="ticker-wrapper">
          {displayStocks.map((stock, index) => (
            <div 
              key={index} 
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
          
          {/* Duplicando elementos para scroll infinito */}
          {displayStocks.map((stock, index) => (
            <div 
              key={`duplicate-${index}`} 
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
      
      {/* Indicador de última actualización (opcional) */}
      {lastUpdated && (
        <div className="text-xs text-right text-muted-foreground pr-2 mt-1">
          Última actualización: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default StockTicker;
