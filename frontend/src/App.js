import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Button } from '@mui/material';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import Login from './components/Login';
import Register from './components/Register';
import AppSnackbar from './components/AppSnackbar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const token = localStorage.getItem('token'); // Check for token to verify authentication

    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }

    if (token) {
      setIsAuthenticated(true); // User is authenticated if token exists
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Button onClick={toggleDarkMode}>Toggle Dark Mode</Button>
        <Routes>
          {/* Redirect to Notes if authenticated, else show Login */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/notes" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/notes"
            element={isAuthenticated ? <Notes /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-note"
            element={isAuthenticated ? <CreateNote setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSeverity={setSeverity} /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit-note/:id"
            element={isAuthenticated ? <EditNote setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSeverity={setSeverity} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>

      <AppSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={severity}
      />
    </ThemeProvider>
  );
}

export default App;
