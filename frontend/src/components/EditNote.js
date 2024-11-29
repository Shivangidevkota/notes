import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const { id } = useParams(); // Get note id from URL
  const navigate = useNavigate();  // To navigate to the notes page

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to login first.");
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/notes/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setNote(response.data);  // Set the fetched note
      } catch (err) {
        setError("Failed to fetch note.");
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/notes/${id}/`,
        note,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Note updated:", response.data); // Log the response for debugging
      navigate("/notes");  // Navigate back to the notes page after successful update
    } catch (err) {
      setError("Failed to update note.");
    }
  };

  return (
    <div>
      <Typography variant="h4">Edit Note</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          required
          sx={{ marginBottom: "15px" }}
        />
        <TextField
          label="Content"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          required
          sx={{ marginBottom: "15px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditNote;
