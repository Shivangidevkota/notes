import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Card, CardContent, Grid, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token"); // Retrieve token
      if (!token) {
        setError("You need to login first.");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/notes/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setNotes(response.data);
      } catch (err) {
        setError("Failed to fetch notes.");
      }
    };
    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setNotes(notes.filter(note => note.id !== id)); // Update UI after deletion
    } catch (err) {
      alert("Failed to delete note.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Notes
      </Typography>

      {/* Logout Button */}
      <IconButton
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        color="secondary"
      >
        <LogoutIcon />
        </IconButton>
      <Link to="/create-note">
        <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
          Create Note
        </Button>
      </Link>

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                {note.content.length > 100
                    ? note.content.slice(0, 100) + "..."
                    : note.content}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
                Created on: {note.created_at} {/* Add date formatting if necessary */}
                </Typography>
                {/* Edit and Delete Icons */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <IconButton
                    onClick={() => navigate(`/edit-note/${note.id}`)}
                    color="primary"
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleDelete(note.id)}
                    color="secondary"
                >
                    <DeleteIcon />
                </IconButton>
                </div>
            </CardContent>
            </Card>
        </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Notes;
