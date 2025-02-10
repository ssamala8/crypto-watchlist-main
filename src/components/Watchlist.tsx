import React, { useState, useEffect } from "react";
import { useWatchlist } from "../context/WatchlistContext";

interface Prices {
  [symbol: string]: string;
}

const Watchlist: React.FC = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [prices, setPrices] = useState<Prices>({});

  useEffect(() => {
    if (watchlist.length === 0) return;

    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: watchlist.map((symbol) => `${symbol.toLowerCase()}@ticker`),
          id: 1,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.s && data.c) {
        setPrices((prev) => ({ ...prev, [data.s]: data.c }));
      }
    };

    return () => {
      ws.close();
    };
  }, [watchlist]);

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
      <ul>
        {watchlist.map((symbol) => (
          <li key={symbol} className="flex justify-between p-2 border-b">
            <span>
              {symbol}: ${prices[symbol] || "Loading..."}
            </span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => removeFromWatchlist(symbol)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
