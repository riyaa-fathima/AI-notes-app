const Note = require("../models/notemodel");

exports.createNote = async (req, res) => {
  try {
    const { title = "Untitled", content = "", tags = [] } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    const note = await Note.create({
      user: req.user._id,
      title: title.trim(),
      content,
      tags: Array.isArray(tags) ? tags : [],
    });
    return res.status(201).json(note);
  } catch (error) {
    console.error("createNote:", error.message);
    return res.status(500).json({ message: "Unable to create note" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Number.parseInt(req.query.limit, 10) || 20);
    const skip = (page - 1) * limit;

    const search = req.query.search ? String(req.query.search).trim() : null;
    const tag = req.query.tag
      ? String(req.query.tag).trim().toLowerCase()
      : null;
    const pinned =
      req.query.pinned === "true"
        ? true
        : req.query.pinned === "false"
        ? false
        : null;

    const filter = { user: userId };
    if (tag) filter.tags = tag; // assumes tags stored lowercased
    if (pinned !== null) filter.pinned = pinned;
    if (search) filter.$text = { $search: search };

    // projection: exclude large content in list view
    const projection = search
      ? {
          score: { $meta: "textScore" },
          title: 1,
          tags: 1,
          pinned: 1,
          updatedAt: 1,
        }
      : { title: 1, tags: 1, pinned: 1, updatedAt: 1 };

    // sort: pinned first, then if text search use textScore, else updatedAt
    const sort = search
      ? { pinned: -1, score: { $meta: "textScore" } }
      : { pinned: -1, updatedAt: -1 };

    const [notes, total] = await Promise.all([
      Note.find(filter, projection).sort(sort).skip(skip).limit(limit).lean(),
      Note.countDocuments(filter),
    ]);

    return res.json({
      data: notes,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("getNotes:", err);
    return res.status(500).json({ message: "Unable to fetch notes" });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "Not authorized to view this note" });

    return res.json(note);
  } catch (err) {
    console.error("getNoteById:", err.message);
    return res.status(500).json({ message: "Unable to fetch note" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "Not authorized to update this note" });

    const { title, content, tags, pinned } = req.body;

    if (title !== undefined) note.title = title.trim();
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = Array.isArray(tags) ? tags : note.tags;
    if (pinned !== undefined) note.pinned = !!pinned;

    note.updatedAt = Date.now();

    const updated = await note.save();
    return res.json(updated);
  } catch (err) {
    console.error("updateNote:", err.message);
    return res.status(500).json({ message: "Unable to update note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });

    await Note.findByIdAndDelete(req.params.id);

    return res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("deleteNote:", err.message);
    return res.status(500).json({ message: "Unable to delete note" });
  }
};

exports.togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    note.pinned = !note.pinned;
    await note.save();
    return res.json(note);
  } catch (err) {
    console.error("togglePin:", err.message);
    return res.status(500).json({ message: "Unable to toggle pin" });
  }
};
