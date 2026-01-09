import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getNotes } from "../services/NoteServices";
import { summarizeText } from "../services/AiService";

export default function Summarize() {
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotes(token, 1, 100).then((res) => {
      setNotes(res.data.data);
    });
  }, [token]);

  const handleSummarize = async () => {
    const note = notes.find((n) => n._id === selectedId);
    if (!note) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await summarizeText(note.content, token);
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setSummary("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notes-page">
      <h2>Summarize Note</h2>

      <select
        className="form-control mb-3"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select a note</option>
        {notes.map((note) => (
          <option key={note._id} value={note._id}>
            {note.title}
          </option>
        ))}
      </select>

      <button
        className="btn load-more-btn"
        disabled={!selectedId || loading}
        onClick={handleSummarize}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="note-card mt-4">
          <div className="card-body">
            <h5 className="note-title">Summary</h5>
            <p className="note-content">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
