import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';


interface LoginProps {
    marginTop?: string | number;
    toggleForm?: () => void;
}

const SignUp: React.FC<LoginProps> = ({ marginTop = '20vh', toggleForm }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/utilisateurs', {
                nom: lastName,
                prenom: firstName,
                email,
                password,
            });
            console.log('Utilisateur créé :', response.data);
            setError(''); 
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            setError('Erreur lors de la création de l\'utilisateur.');
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
                Inscription
            </Typography>
            {error && <Alert severity="error" sx={{ marginBottom: '20px', width: '300px' }}>{error}</Alert>}
            <TextField
                label="Prénom"
                variant="outlined"
                value={firstName}
                onChange={handleFirstNameChange}
                sx={{ marginBottom: '20px', width: '300px' }}
                required
            />
            <TextField
                label="Nom"
                variant="outlined"
                value={lastName}
                onChange={handleLastNameChange}
                sx={{ marginBottom: '20px', width: '300px' }}
                required
            />
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
            <Button type="submit" variant="contained" color="primary" sx={{ width: '300px', marginBottom: '20px' }}>
                S'inscrire
            </Button>
            <div style={{ marginTop: '20px', fontSize: '1.1rem' }}>
                Déjà un compte ? <Button onClick={toggleForm} sx={{ textTransform: 'none', fontSize: '1.1rem', marginLeft: '6px' }}>Se connecter</Button>
            </div>
        </Box>
    );
}

export default SignUp;
