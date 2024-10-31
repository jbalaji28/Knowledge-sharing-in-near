// src/pages/security.jsx

import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, CardActions, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security'; // Material-UI icon for enhanced visuals

const SecurityPage = () => {
  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description: 'All data is encrypted during transmission, ensuring confidentiality.',
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Protect your account with an additional layer of security.',
    },
    {
      title: 'Reputation Scoring',
      description: 'Users are rated based on their transaction history for better trust.',
    },
    {
      title: 'Escrow Protection',
      description: 'Funds are held securely until all conditions of the transaction are met.',
    },
  ];

  return (
    <Box sx={{ padding: '3rem', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#3f51b5' }}>
        Security & Transparency
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ marginBottom: '3rem' }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <img
              src="https://img.lovepik.com/free-png/20211214/lovepik-network-security-lock-png-image_401593002_wh1200.png"
              alt="Secure & Transparent Icon"
              style={{ width: '80px', height: '80px', marginBottom: '1rem' }}
            />
            <Typography variant="h5" sx={{ marginBottom: '1rem', color: '#3f51b5' }}>
              Secure & Transparent
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '1rem' }}>
              Reputation scores and escrow protection are fundamental to our platform, ensuring that your transactions are safe and reliable.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Our platform utilizes advanced security protocols to protect your assets and information while providing transparency in all transactions.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#3f51b5' }}>
        Key Security Features
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {securityFeatures.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Card variant="outlined" sx={{ borderRadius: '8px' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <SecurityIcon color="primary" sx={{ fontSize: '40px', marginBottom: '1rem' }} />
                <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#3f51b5', marginTop: '3rem' }}>
        Why Choose Us?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ marginBottom: '1rem', color: '#3f51b5' }}>
              Your Trust is Our Priority
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '1rem' }}>
              Our commitment to security ensures that your transactions are conducted in a safe environment. We prioritize user protection and transparency in every transaction.
            </Typography>
            <Button variant="contained" color="primary" href="/" sx={{ marginTop: '1rem' }}>
              Learn More
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecurityPage;
