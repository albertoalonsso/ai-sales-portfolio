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

// Lista ampliada a aproximadamente 100 símbolos
const stockSymbols = [
  // Índices principales globales
  'SPY',    // S&P 500 ETF
  'QQQ',    // NASDAQ ETF
  'DIA',    // Dow Jones ETF
  'IWM',    // Russell 2000
  'EFA',    // MSCI EAFE (Europa, Australasia, Lejano Oriente)
  'EEM',    // MSCI Mercados Emergentes
  'IBEX.MC',// IBEX 35 (España)
  'DAX',    // DAX (Alemania)
  'FTSE.L', // FTSE 100 (Reino Unido)
  'FCHI.PA',// CAC 40 (Francia)
  'N225',   // Nikkei 225 (Japón)
  'HSI',    // Hang Seng (Hong Kong)
  'SSEC',   // Shanghai Composite (China)
  'BSESN',  // Sensex (India)
  'GSPTSE', // S&P/TSX (Canadá)
  'BVSP',   // Bovespa (Brasil)
  
  // Tecnología
  'AAPL',  // Apple
  'MSFT',  // Microsoft
  'GOOGL', // Alphabet (Google) Class A
  'GOOG',  // Alphabet (Google) Class C
  'AMZN',  // Amazon
  'META',  // Meta (Facebook)
  'TSLA',  // Tesla
  'NVDA',  // NVIDIA
  'AVGO',  // Broadcom
  'ORCL',  // Oracle
  'CRM',   // Salesforce
  'CSCO',  // Cisco
  'ADBE',  // Adobe
  'AMD',   // AMD
  'INTC',  // Intel
  'IBM',   // IBM
  'QCOM',  // Qualcomm
  'TXN',   // Texas Instruments
  'NFLX',  // Netflix
  'PYPL',  // PayPal
  'MU',    // Micron Technology
  'AMAT',  // Applied Materials
  
  // Finanzas
  'JPM',    // JPMorgan Chase
  'BAC',    // Bank of America
  'WFC',    // Wells Fargo
  'C',      // Citigroup
  'GS',     // Goldman Sachs
  'MS',     // Morgan Stanley
  'BLK',    // BlackRock
  'SCHW',   // Charles Schwab
  'AXP',    // American Express
  'V',      // Visa
  'MA',     // Mastercard
  'BNP.PA', // BNP Paribas (Francia)
  'HSBA.L', // HSBC (Reino Unido)
  'DB',     // Deutsche Bank
  'UBS',    // UBS Group
  'CSGN.SW',// Credit Suisse
  
  // Salud
  'JNJ',    // Johnson & Johnson
  'PFE',    // Pfizer
  'MRK',    // Merck
  'ABBV',   // AbbVie
  'ABT',    // Abbott Laboratories
  'TMO',    // Thermo Fisher Scientific
  'DHR',    // Danaher
  'LLY',    // Eli Lilly
  'BMY',    // Bristol Myers Squibb
  'AMGN',   // Amgen
  'UNH',    // UnitedHealth Group
  
  // Consumo
  'PG',     // Procter & Gamble
  'KO',     // Coca-Cola
  'PEP',    // PepsiCo
  'WMT',    // Walmart
  'COST',   // Costco
  'NKE',    // Nike
  'MCD',    // McDonald's
  'SBUX',   // Starbucks
  'DIS',    // Disney
  'HD',     // Home Depot
  'LOW',    // Lowe's
  'TGT',    // Target
  'AMZN',   // Amazon (también en tecnología)
  
  // Energía
  'XOM',    // ExxonMobil
  'CVX',    // Chevron
  'BP',     // BP
  'SHEL',   // Shell
  'TTE',    // TotalEnergies
  'COP',    // ConocoPhillips
  'EOG',    // EOG Resources
  'SLB',    // Schlumberger
  
  // Industria
  'GE',     // General Electric
  'HON',    // Honeywell
  'MMM',    // 3M
  'CAT',    // Caterpillar
  'DE',     // John Deere
  'BA',     // Boeing
  'LMT',    // Lockheed Martin
  'RTX',    // Raytheon Technologies
  
  // Internacional
  'BABA',   // Alibaba
  'TCEHY',  // Tencent
  'TSM',    // Taiwan Semiconductor
  'TM',     // Toyota
  'SONY',   // Sony
  'SAP',    // SAP
  'SNE',    // Sony
  
  // Commodities (ETFs)
  'GLD',    // Gold
  'SLV',    // Silver
  'USO',    // Oil
  'UNG',    // Natural Gas
  'DBC',    // Commodities Basket
];

// Estado inicial con información mínima para todos los símbolos
const initialStocksState: StockItem[] = stockSymbols.map((symbol, index) => ({
  symbol,
  // Valores iniciales aleatorios para que se muestre algo mientras se cargan los datos reales
  price: 50 + Math.random() * 150,
  change: (Math.random() * 4) - 2,
  loading: true,
  error: false
}));

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockItem[]>(initialStocksState);

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
        // Para errores, mantenemos los datos simulados pero marcamos como no cargando
        const currentStock = stocks.find(s => s.symbol === symbol);
        return {
          symbol,
          price: currentStock?.price || 50 + Math.random() * 150,
          change: currentStock?.change || (Math.random() * 4) - 2,
          loading: false,
          error: true
        };
      }
    } catch (error) {
      console.error(`Error en la solicitud para ${symbol}:`, error);
      // Para errores, mantenemos los datos simulados pero marcamos como no cargando
      const currentStock = stocks.find(s => s.symbol === symbol);
      return {
        symbol,
        price: currentStock?.price || 50 + Math.random() * 150,
        change: currentStock?.change || (Math.random() * 4) - 2,
        loading: false,
        error: true
      };
    }
  }, [stocks]);

  // Función para cargar datos en lotes
  const loadStockDataInBatches = useCallback(async () => {
    console.log("Iniciando carga de datos en lotes...");
    
    // Alpha Vantage tiene límites: 5 llamadas por minuto en su plan gratuito
    // Procesamos en lotes para respetar esos límites
    const batchSize = 5;
    
    for (let i = 0; i < stockSymbols.length; i += batchSize) {
      const batch = stockSymbols.slice(i, i + batchSize);
      
      try {
        // Procesar este lote en paralelo
        const batchResults = await Promise.all(
          batch.map(async (symbol) => {
            return await fetchStockData(symbol);
          })
        );
        
        // Actualizar los stocks con los nuevos resultados
        setStocks(prevStocks => {
          const updatedStocks = [...prevStocks];
          
          batchResults.forEach(result => {
            const index = updatedStocks.findIndex(s => s.symbol === result.symbol);
            if (index !== -1) {
              // Si el resultado es un error pero tenemos datos previos, mantenemos esos datos
              if (result.error && updatedStocks[index].price > 0 && !updatedStocks[index].loading) {
                updatedStocks[index] = {
                  ...updatedStocks[index],
                  loading: false,
                  error: false // No mostramos error si tenemos datos previos
                };
              } else {
                updatedStocks[index] = result;
              }
            }
          });
          
          return updatedStocks;
        });
        
        // Esperar 15 segundos antes del siguiente lote para respetar los límites de la API
        if (i + batchSize < stockSymbols.length) {
          await new Promise(resolve => setTimeout(resolve, 15000));
        }
      } catch (error) {
        console.error("Error procesando lote:", error);
      }
    }
    
    console.log("Carga de datos completada.");
  }, [fetchStockData]);

  // Cargar datos inicialmente y configurar actualizaciones
  useEffect(() => {
    // Carga inicial
    loadStockDataInBatches();
    
    // Actualizar cada 5 minutos
    const updateInterval = setInterval(() => {
      loadStockDataInBatches();
    }, 5 * 60 * 1000); // 5 minutos en milisegundos
    
    return () => clearInterval(updateInterval);
  }, [loadStockDataInBatches]);

  // Duplicar para efecto de scroll infinito
  const repeatedStocks = [...stocks, ...stocks, ...stocks];

  return (
    <div className="w-full bg-navy/10 text-sm py-2 overflow-hidden border-t border-navy/20">
      <div className="ticker-container">
        <div 
          className="ticker-wrapper"
          style={{ animation: 'ticker 180s linear infinite' }} // Ticker muy lento (3 minutos) para valores
        >
          {repeatedStocks.map((stock, index) => (
            <div 
              key={`stock-${index}`} 
              className="inline-flex items-center mx-4 whitespace-nowrap"
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
    </div>
  );
};

export default StockTicker;
