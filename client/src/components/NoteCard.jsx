import { useAuth } from "../context/AuthContext";
import { deleteNote } from "../services/NoteServices";
import "../styles/NoteCard.scss";

export default function NoteCard({ note, setNotes }) {
  const { token } = useAuth();

  const handleDelete = async () => {
    await deleteNote(note._id, token);
    setNotes((prev) => prev.filter((n) => n._id !== note._id));
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card note-card">
        <div className="card-body">
          <h5 className="note-title">{note.title}</h5>
          <p className="note-content">{note.content}</p>

          <div className="note-actions">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
