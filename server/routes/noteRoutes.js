const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  togglePin,
} = require("../controller/noteController");

const router = express.Router();
router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.put("/:id", protect, updateNote);
router.patch("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.patch("/:id/toggle-pin", protect, togglePin);
module.exports = router;
