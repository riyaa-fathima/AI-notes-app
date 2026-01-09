const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { summarizeText } = require("../controller/aiController");

const router = express.Router();

router.post("/summarize", protect,summarizeText);
module.exports = router;
