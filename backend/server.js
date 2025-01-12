import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import cors
import cron from "node-cron";
import axios from "axios";
import connectDB from "./config/db.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import Crypto from "./models/Crypto.js";
import dotenv from 'dotenv';

dotenv.config(); // This loads the environment variables from the .env file

const app = express();

// Enable CORS for all origins
app.use(cors());

// If you want to allow only specific origins, use this instead
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

// Routes
app.use("/", cryptoRoutes);

// Fetch crypto data from CoinGecko API
const fetchCryptoData = async () => {
    const coins = ["bitcoin", "matic-network", "ethereum"];
    const baseUrl = "https://api.coingecko.com/api/v3/simple/price";

    try {
        for (const coin of coins) {
            const response = await axios.get(baseUrl, {
                params: {
                    ids: coin,
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_change: true,
                },
            });

            const data = response.data[coin];
            const newCrypto = new Crypto({
                coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                "24hChange": data.usd_24h_change,
            });

            await newCrypto.save();
            console.log(`Data saved for ${coin}`);
        }
    } catch (error) {
        console.error("Error fetching crypto data:", error.message);
    }
};

fetchCryptoData();  // Call immediately to test fetching

// Schedule the job to run every 2 hours
// cron.schedule("0 */2 * * *", () => {
//     console.log("Fetching crypto data...");
//     fetchCryptoData();
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
