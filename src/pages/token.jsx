// src/pages/token.jsx

import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, CardActions, Grid, Paper, Snackbar } from '@mui/material';

const TokenPage = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTokenTransfer = () => {
    if (amount && recipient) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMessage(`✅ Successfully sent ${amount} NEAR to ${recipient}`);
        setSnackbarOpen(true); // Open the Snackbar
      }, 1000); // Simulating a network request
    } else {
      setMessage('⚠️ Please fill in all fields.');
      setSnackbarOpen(true); // Open the Snackbar for error
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: '3rem', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#3f51b5' }}>
        NEAR Token Transfer
      </Typography>

      <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: '1.5rem', textAlign: 'center', color: '#3f51b5' }}>
          Transfer Your NEAR Tokens Securely
        </Typography>

        <Card variant="outlined" sx={{ marginBottom: '2rem' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Amount (NEAR)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  inputProps={{ min: "0" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Recipient Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </Grid>
              {message && (
                <Grid item xs={12}>
                  <Typography variant="body1" color={message.includes('⚠️') ? 'error.main' : 'success.main'} sx={{ marginTop: '1rem', textAlign: 'center' }}>
                    {message}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTokenTransfer}
              disabled={loading}
              sx={{ width: '100%' }}
            >
              {loading ? 'Sending...' : 'Send NEAR Tokens'}
            </Button>
          </CardActions>
        </Card>

        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
          Tranfer your token with ease...
        </Typography>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default TokenPage;
