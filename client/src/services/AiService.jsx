import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const summarizeText = (text, token) =>
  axios.post(
    `${API}/ai/summarize`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
