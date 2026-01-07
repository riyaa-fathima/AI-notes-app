import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getNotes } from "../services/NoteServices";
import { Link } from "react-router-dom";
import "../styles/Dashboard.scss";

export default function Dashboard() {
  const { token, user } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes(token, 1, 6).then((res) => setNotes(res.data.data));
  }, [token]);

  const pinned = notes.filter((n) => n.pinned);

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Hello, {user?.name} </h2>
          <p className="subtext">
            Capture your thoughts. Let the app remember.
          </p>
        </div>

        <Link to="/notes" className="btn btnnote btn-dark">
          + New Note
        </Link>
      </div>

      {/* PINNED */}
      {pinned.length > 0 && (
        <section>
          <h4>Pinned</h4>
          <div className="note-preview-grid">
            {pinned.map((note) => (
              <div key={note._id} className="note-preview pinned">
                <h5>{note.title}</h5>
                <p>{note.content.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RECENT */}
      <section>
        <h4>Recent Notes</h4>

        {notes.length === 0 ? (
          <p className="empty">No notes yet. Start writing.</p>
        ) : (
          <div className="note-preview-grid">
            {notes.map((note) => (
              <div key={note._id} className="note-preview">
                <h5>{note.title}</h5>
                <p>{note.content.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
