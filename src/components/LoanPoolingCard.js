// components/LoanPoolingCard.js
import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, Typography } from '@mui/material';

const LoanPoolingCard = () => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/loan'); // Navigate to the Loan.js page
  };

  return (
    <Card onClick={handleCardClick} style={{ cursor: 'pointer', marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h5">Loan Pooling</Typography>
        <Typography color="textSecondary">Click to learn more about loan pooling.</Typography>
      </CardContent>
    </Card>
  );
};

export default LoanPoolingCard;
