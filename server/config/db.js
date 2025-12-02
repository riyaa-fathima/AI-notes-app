const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connnected succesfully ");
  } catch (error) {
    console.error("mongodb connection failed");
  }
};

module.exports = connectDB;
