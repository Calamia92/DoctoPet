import React from 'react';
import { Box, Typography } from '@mui/material';

const ADomicilePage: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        À Domicile
      </Typography>
      <Typography variant="body1">
        Bienvenue sur la page "À Domicile". Trouvez toutes les informations nécessaires pour les consultations à domicile.
      </Typography>
    </Box>
  );
};

export default ADomicilePage;
