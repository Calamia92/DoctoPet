import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

interface Utilisateur {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

interface Animal {
  id?: string;
  nom: string;
  type: string;
  proprietaireId: string;
}

interface Cabinet {
  id?: string;
  nom: string;
  adresse: string;
  userIds: string[];
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [animaux, setAnimaux] = useState<Animal[]>([]);
  const [cabinets, setCabinets] = useState<Cabinet[]>([]);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3000/utilisateurs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(userResponse.data);

        const animauxResponse = await axios.get('http://localhost:3000/animaux', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAnimaux(animauxResponse.data);

        const cabinetsResponse = await axios.get('http://localhost:3000/cabinets', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCabinets(cabinetsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateUser = async (user: Utilisateur) => {
    try {
      const response = await axios.post('http://localhost:3000/utilisateurs', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCreateAnimal = async (animal: Animal) => {
    try {
      const response = await axios.post('http://localhost:3000/animaux', animal, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAnimaux([...animaux, response.data]);
    } catch (error) {
      console.error('Error creating animal:', error);
    }
  };

  const handleCreateCabinet = async (cabinet: Cabinet) => {
    try {
      const response = await axios.post('http://localhost:3000/cabinets', cabinet, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCabinets([...cabinets, response.data]);
    } catch (error) {
      console.error('Error creating cabinet:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Button onClick={() => handleCreateUser({ nom: 'Test', prenom: 'User', email: 'test@example.com', password: 'password' })}>
        Create User
      </Button>
      <Button onClick={() => handleCreateAnimal({ nom: 'Test Animal', type: 'Dog', proprietaireId: 'some-user-id' })}>
        Create Animal
      </Button>
      <Button onClick={() => handleCreateCabinet({ nom: 'Test Cabinet', adresse: '123 Test St', userIds: ['some-user-id'] })}>
        Create Cabinet
      </Button>
    </Box>
  );
};

export default AdminDashboard;
