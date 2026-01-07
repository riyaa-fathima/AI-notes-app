import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getNotes = (token, page = 1, limit = 20, search = "") =>
  axios.get(
    `${API}/notes?page=${page}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const createNote = (data, token) =>
  axios.post(`${API}/notes`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteNote = (id, token) =>
  axios.delete(`${API}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateNote = (id, data, token) =>
  axios.put(`${API}/notes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const togglePin = (id, pinned, token) =>
  axios.put(
    `${API}/notes/${id}`,
    {
      pinned,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
