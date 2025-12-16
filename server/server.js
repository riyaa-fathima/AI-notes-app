const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes")
const aiRoutes= require("./routes/aiRoutes")

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/user", userRoutes);
app.use("/notes", noteRoutes);
app.use("/ai",aiRoutes );

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running in ${PORT}`));
