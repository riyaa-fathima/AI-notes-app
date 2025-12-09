const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);

    console.log("mongodb connnected succesfully ");
  } catch (error) {
    console.error("mongodb connection failed", error.message);
  }
};

module.exports = connectDB;
