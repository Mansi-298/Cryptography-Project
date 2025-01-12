import express from "express";
import Crypto from "../models/Crypto.js";

const router = express.Router();

// Task 2: Get the latest cryptocurrency stats
router.get("/stats", async (req, res) => {
    console.log("hello");
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: "Coin parameter is required" });
    }

    try {
        const latestCrypto = await Crypto.findOne({ coin }).sort({ createdAt: -1 });

        if (!latestCrypto) {
            return res.status(404).json({ message: `${coin} data not found` });
        }

        res.json({
            price: latestCrypto.price,
            marketCap: latestCrypto.marketCap,
            "24hChange": latestCrypto["24hChange"],
        });
    } catch (error) {
        console.error("Error fetching crypto stats", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Task 3: Calculate the standard deviation of the price for the last 100 records
router.get("/deviation", async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ message: "Coin parameter is required" });
    }

    try {
        const cryptoData = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);

        if (cryptoData.length === 0) {
            return res.status(404).json({ message: `${coin} data not found` });
        }

        const prices = cryptoData.map((record) => record.price);
        const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;

        const squaredDifferences = prices.map((price) => Math.pow(price - mean, 2));
        const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / squaredDifferences.length;
        const standardDeviation = Math.sqrt(variance);

        res.json({ deviation: standardDeviation.toFixed(2) });
    } catch (error) {
        console.error("Error calculating deviation", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
