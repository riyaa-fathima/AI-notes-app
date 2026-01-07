import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteNote, togglePin } from "../services/NoteServices";
import { updateNote } from "../services/NoteServices";

import "../styles/NoteCard.scss";

export default function NoteCard({ note, setNotes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const { token } = useAuth();

  const handleDelete = async () => {
    await deleteNote(note._id, token);
    setNotes((prev) => prev.filter((n) => n._id !== note._id));
  };

  const handlePin = async () => {
    const res = await togglePin(note._id, !note.pinned, token);
    setNotes((prev) => prev.map((n) => (n.id === note._id ? res.data : n)));
  };

  const handleUpdate = async () => {
    const res = await updateNote(note._id, { title, content }, token);

    setNotes((prev) => prev.map((n) => (n._id === note._id ? res.data : n)));

    setIsEditing(false);
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card note-card">
        <div className="card-body">
          {isEditing ? (
            <>
              <input
                className="form-control mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </>
          ) : (
            <>
              <h5 className="note-title">{note.title}</h5>
              <p className="note-content">{note.content}</p>
            </>
          )}

          <div className="note-actions">
            {isEditing ? (
              <>
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handlePin}
                >
                  {note.pinned ? "Unpin" : "Pin"}
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
