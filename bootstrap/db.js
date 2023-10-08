require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const mongoose = require("mongoose"); // Import mongoose

const uri = process.env.MONGO_URI; // Add URI MongoDB Atlas

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
