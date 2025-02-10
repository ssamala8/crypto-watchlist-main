import React from "react";
import CryptoList from "./components/CryptoList";
import Watchlist from "./components/Watchlist";
import { WatchlistProvider } from "./context/WatchlistContext";

const App: React.FC = () => {
  return (
    <WatchlistProvider>
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold text-center">Crypto Watchlist</h1>
        <div className="flex justify-between w-full">
          <CryptoList />
          <Watchlist />
        </div>
      </div>
    </WatchlistProvider>
  );
};

export default App;
