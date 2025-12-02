const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running in ${PORT}`));
