import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Signup = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cabinetIds, setCabinetIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/utilisateurs', {
        nom,
        email,
        password,
        cabinetIds
      });
      console.log('Utilisateur créé :', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Inscription
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Nom"
            fullWidth
            margin="normal"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Cabinet IDs (séparés par des virgules)"
            fullWidth
            margin="normal"
            value={cabinetIds.join(',')}
            onChange={(e) => setCabinetIds(e.target.value.split(','))}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            S'inscrire
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
