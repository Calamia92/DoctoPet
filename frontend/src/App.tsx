import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import homeIcon from '@iconify-icons/mdi/home';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to FilesHub Frontend
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Icon icon={homeIcon} />}>
        Home
      </Button>
    </Container>
  );
};

export default App;
