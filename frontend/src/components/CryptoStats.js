import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoStats = ({ coin }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/stats?coin=${coin}`);
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [coin]);

  if (loading) return <p className="text-center">Loading stats...</p>;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">Stats for {coin.replace("-", " ")}</h2>
      <p>Price: ${stats.price}</p>
      <p>Market Cap: ${stats.marketCap.toLocaleString()}</p>
      <p>24h Change: {stats["24hChange"]}%</p>
    </div>
  );
};

export default CryptoStats;
