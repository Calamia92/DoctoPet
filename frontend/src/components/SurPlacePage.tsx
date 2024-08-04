import React from 'react';
import { Box, Typography } from '@mui/material';

const SurPlacePage: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Sur Place
      </Typography>
      <Typography variant="body1">
        Bienvenue sur la page "Sur Place". Ici vous trouverez toutes les informations nécessaires pour les consultations sur place.
      </Typography>
    </Box>
  );
};

export default SurPlacePage;
