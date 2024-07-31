import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50px',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Déconnexion
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Se déconnecter
            </Button>
        </Box>
    );
};

export default Logout;
