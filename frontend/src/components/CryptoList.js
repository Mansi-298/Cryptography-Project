import React from "react";

const CryptoList = ({ onSelectCoin }) => {
  const coins = ["bitcoin", "matic-network", "ethereum"];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Select a Cryptocurrency</h1>
      <div className="space-y-2">
        {coins.map((coin) => (
          <button
            key={coin}
            onClick={() => onSelectCoin(coin)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            {coin.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
