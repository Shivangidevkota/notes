// src/components/AppSnackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AppSnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
