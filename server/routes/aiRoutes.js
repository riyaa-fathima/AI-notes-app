const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  summarizeNote,
  
} = require("../controller/aiController");

const router = express.Router();

router.post("/summarize", protect, summarizeNote);
// router.post("/explain", protect, explainNote);
// router.post("/title", protect, generateTitle);
// router.post("/bullets", protect, bulletPoints);

module.exports = router;
