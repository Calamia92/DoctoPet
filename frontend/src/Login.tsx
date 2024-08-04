import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    marginTop?: string | number;
    toggleForm?: () => void;
}

const Login: React.FC<LoginProps> = ({ marginTop = '30vh', toggleForm }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSignUpRedirect = () => {
        if (toggleForm) {
            toggleForm();
        }
    };
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password,
            });

            console.log('User logged in:', response.data);

            if (!response.data.userId) {
                throw new Error("User ID is not returned from the server.");
            }

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('userId', response.data.userId);  

            if (response.data.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
        }
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
                marginTop: marginTop,
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
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" sx={{ width: '300px', padding: '12px' }}>
                Se connecter
            </Button>
            <div style={{marginTop: '20px', fontSize: '1.1rem'}}>
                Pas de Compte ? <Button onClick={handleSignUpRedirect} sx={{ textTransform: 'none', fontSize: '1.1rem', marginLeft: '6px' }}>S'inscrire</Button>
            </div>
        </Box>
    );
}

export default Login;
