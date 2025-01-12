import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoDeviation = ({ coin }) => {
  const [deviation, setDeviation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/deviation?coin=${coin}`);
        setDeviation(response.data.deviation);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deviation:", error);
        setLoading(false);
      }
    };

    fetchDeviation();
  }, [coin]);

  if (loading) return <p className="text-center">Loading deviation...</p>;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">Standard Deviation for {coin.replace("-", " ")}</h2>
      <p>Deviation: {deviation.toFixed(2)}</p>
    </div>
  );
};

export default CryptoDeviation;
