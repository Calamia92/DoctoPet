import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50px',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Connexion
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={handleEmailChange}
                sx={{ marginBottom: '20px', width: '300px' }}
                required
            />
            <TextField
                label="Mot de passe"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                sx={{ marginBottom: '20px', width: '300px' }}
                required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ width: '300px' }}>
                Se connecter
            </Button>
        </Box>
    );
}

export default Login;
