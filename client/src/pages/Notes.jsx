import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getNotes } from "../services/NoteServices";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import "../styles/Note.scss";

export default function Notes() {
  const { token } = useAuth();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (pageNumber = 1, append = false) => {
    setLoading(true);
    try {
      const res = await getNotes(
        token,
        pageNumber,
        20,
        debouncedSearch
      );

      const newNotes = res.data.data;
      const totalPages = res.data.meta.pages;

      setPages(totalPages);

      setNotes((prev) =>
        append ? [...prev, ...newNotes] : newNotes
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchNotes(1, false);
  }, [token, debouncedSearch]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotes(nextPage, true);
  };

  const sortedNotes = [...notes].sort(
    (a, b) => b.pinned - a.pinned
  );

  return (
    <div className="notes-page">
      <h2>Your Notes</h2>

      
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <NoteForm setNotes={setNotes} />

      {sortedNotes.length === 0 && !loading ? (
        <p className="text-muted mt-4">
          {debouncedSearch
            ? "No notes match your search."
            : "You don’t have any notes yet. Create one above."}
        </p>
      ) : (
        <div className="row notes-grid mt-4">
          {sortedNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              setNotes={setNotes}
            />
          ))}
        </div>
      )}

      {page < pages && (
        <div className="text-center mt-4">
          <button
            className="btn load-more-btn"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
