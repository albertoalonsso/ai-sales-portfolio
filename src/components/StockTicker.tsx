
import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockItem {
  symbol: string;
  price: number;
  change: number;
}

const initialStocks: StockItem[] = [
  { symbol: 'NASDAQ', price: 17652.36, change: -0.55 },
  { symbol: 'AAPL', price: 185.56, change: 1.20 },
  { symbol: 'TSLA', price: 252.17, change: -2.30 },
  { symbol: 'MSFT', price: 415.33, change: 0.45 },
  { symbol: 'AMZN', price: 183.05, change: -0.78 },
  { symbol: 'META', price: 477.82, change: 1.56 },
  { symbol: 'GOOG', price: 167.29, change: -0.35 },
  { symbol: 'NFLX', price: 628.45, change: 2.10 }
];

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockItem[]>(initialStocks);

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          price: parseFloat((stock.price + (Math.random() * 2 - 1)).toFixed(2)),
          change: parseFloat((stock.change + (Math.random() * 0.4 - 0.2)).toFixed(2))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-navy/10 text-sm py-2 overflow-hidden border-t border-navy/20">
      <div className="ticker-container">
        <div className="ticker-wrapper">
          {stocks.map((stock, index) => (
            <div key={index} className="inline-flex items-center mx-4">
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
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockTicker;
