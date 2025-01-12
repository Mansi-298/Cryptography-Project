import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "tailwindcss/tailwind.css";


function App() {
  // State to hold coin data for each cryptocurrency
  const [coinsData, setCoinsData] = useState({
    bitcoin: { stats: {}, deviation: null },
    matic: { stats: {}, deviation: null },
    ethereum: { stats: {}, deviation: null }
  });

  // Fetch coin data and deviation for all three coins (Bitcoin, Matic, Ethereum)
  const fetchData = async () => {
    try {
      // Fetch stats for all coins
      const bitcoinStats = await axios.get("http://localhost:8000/stats?coin=bitcoin");
      const maticStats = await axios.get("http://localhost:8000/stats?coin=matic-network");
      const ethereumStats = await axios.get("http://localhost:8000/stats?coin=ethereum");

      // Fetch deviation for all coins
      const bitcoinDeviation = await axios.get("http://localhost:8000/deviation?coin=bitcoin");
      const maticDeviation = await axios.get("http://localhost:8000/deviation?coin=matic-network");
      const ethereumDeviation = await axios.get("http://localhost:8000/deviation?coin=ethereum");

      // Update state with fetched data
      setCoinsData({
        bitcoin: {
          stats: bitcoinStats.data,
          deviation: bitcoinDeviation.data.deviation
        },
        matic: {
          stats: maticStats.data,
          deviation: maticDeviation.data.deviation
        },
        ethereum: {
          stats: ethereumStats.data,
          deviation: ethereumDeviation.data.deviation
        }
      });
    } catch (error) {
      console.error("Error fetching coin data or deviation", error);
    }
  };

  // Call fetchData initially and every 15 minutes
  useEffect(() => {
    fetchData(); // Initial data fetch

    // Set interval to refetch every 15 minutes
    const interval = setInterval(fetchData, 2 * 60 * 60 * 1000); // 15 minutes in milliseconds
    ;
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div className="App container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Cryptocurrency Dashboard</h1>
      <div className="mt-8 flex space-x-6 overflow-x-auto">
        {/* Bitcoin Card */}
        <div className="p-6 bg-white border border-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Bitcoin</h2>
          <div className="mt-4 text-gray-700">
            <p className="text-lg">Price: ${coinsData.bitcoin.stats.price}</p>
            <p className="text-lg">Market Cap: ${coinsData.bitcoin.stats.marketCap}</p>
            <p className="text-lg">24h Change: {coinsData.bitcoin.stats["24hChange"]}%</p>
            <p className="text-lg">Standard Deviation: {coinsData.bitcoin.deviation}</p>
          </div>
        </div>

        {/* Matic Card */}
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Matic</h2>
          <div className="mt-4 text-gray-700">
            <p className="text-lg">Price: ${coinsData.matic.stats.price}</p>
            <p className="text-lg">Market Cap: ${coinsData.matic.stats.marketCap}</p>
            <p className="text-lg">24h Change: {coinsData.matic.stats["24hChange"]}%</p>
            <p className="text-lg">Standard Deviation: {coinsData.matic.deviation}</p>
          </div>
        </div>

        { /* Ethereum Card */}
        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Ethereum</h2>
          <div className="mt-4 text-gray-700">
            <p className="text-lg">Price: ${coinsData.ethereum.stats.price}</p>
            <p className="text-lg">Market Cap: ${coinsData.ethereum.stats.marketCap}</p>
            <p className="text-lg">24h Change: {coinsData.ethereum.stats["24hChange"]}%</p>
            <p className="text-lg">Standard Deviation: {coinsData.ethereum.deviation}</p>
          </div>
        </div>
      </div>
    </div> 
    
    
    
    
  );
}

export default App;
