// models/Crypto.js
import mongoose from 'mongoose';

const CryptoSchema = new mongoose.Schema({
    coin: String,
    price: Number,
    marketCap: Number,
    "24hChange": Number,
});

const Crypto = mongoose.model('Crypto', CryptoSchema);
export default Crypto;  // This ensures that the model is exported as default
