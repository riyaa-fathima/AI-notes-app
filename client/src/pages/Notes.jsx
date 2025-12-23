import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getNotes } from "../services/NoteServices";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import "../styles/Note.scss";

export default function Notes() {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await getNotes(token);
        setNotes(res.data.data);
        console.log("resdata", res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, [token]);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div className="notes-page">
      <h2>Your Notes</h2>

      <NoteForm setNotes={setNotes} />

      {notes.length === 0 ? (
        <p className="text-muted mt-4">
          You don’t have any notes yet. Create one above.
        </p>
      ) : (
        <div className="row notes-grid">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
}
