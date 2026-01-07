import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createNote } from "../services/NoteServices";
import "../styles/NoteForm.scss"

export default function NoteForm({ setNotes }) {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const res = await createNote({ title, content }, token);
    setNotes((prev) => [res.data, ...prev]);

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn add-note-btn btn-dark">Add Note</button>
    </form>
  );
}
