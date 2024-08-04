import React from 'react';
import { Box, Typography } from '@mui/material';

const EnLignePage: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        En Ligne
      </Typography>
      <Typography variant="body1">
        Bienvenue sur la page "En Ligne". Découvrez les options disponibles pour les consultations en ligne.
      </Typography>
    </Box>
  );
};

export default EnLignePage;
