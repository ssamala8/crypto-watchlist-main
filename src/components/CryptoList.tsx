import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWatchlist } from "../context/WatchlistContext";

interface Coin {
  symbol: string;
  price: string;
}

const CryptoList: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState<string>("");
  const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get<Coin[]>(
          "https://api.binance.com/api/v3/ticker/price"
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="p-4 w-full">
      <input
        type="text"
        placeholder="Search crypto..."
        className="w-full p-2 border rounded-md mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {coins
          .filter((coin) =>
            coin.symbol.toLowerCase().includes(search.toLowerCase())
          )
          .map((coin) => (
            <li key={coin.symbol} className="flex justify-between p-2 border-b">
              <span>
                {coin.symbol}: ${coin.price}
              </span>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => addToWatchlist(coin.symbol)}
              >
                Add
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CryptoList;
