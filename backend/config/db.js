import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error("Mongo URI is not defined in .env");
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
  }
};

export default connectDB;
