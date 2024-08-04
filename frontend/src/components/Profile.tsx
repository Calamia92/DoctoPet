import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  TextField,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person,
  Email,
  Pets,
  Add,
  EventNote,
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material';
import axios from 'axios';

interface Animal {
  id: string;
  nom: string;
  type: string;
}

interface Appointment {
  id: string;
  status: string;
  name: string;
  reason: string;
  date: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    id: '',
    nom: '',
    prenom: '',
    email: '',
  });
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [openAnimalModal, setOpenAnimalModal] = useState(false);
  const [newAnimal, setNewAnimal] = useState({ nom: '', type: '' });

  useEffect(() => {
    axios
      .get('http://localhost:3000/utilisateurs/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        const { id, nom, prenom, email } = response.data; 
        setProfileData({ id, nom, prenom, email }); 
      })
      .catch((error) => console.error('Failed to fetch profile:', error));

    axios
      .get('http://localhost:3000/animaux', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        const userAnimals = Object.entries(response.data || {}).map(
          ([id, animal]: [string, any]) => ({
            id,
            ...animal,
          })
        );
        setAnimals(userAnimals);
      })
      .catch((error) => console.error('Failed to fetch animals:', error));

    axios
      .get('http://localhost:3000/appointments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        const userAppointments = Object.entries(response.data || {}).map(
          ([id, appointment]: [string, any]) => ({
            id,
            ...appointment,
          })
        );
        setAppointments(userAppointments);
      })
      .catch((error) =>
        console.error('Failed to fetch appointments:', error)
      );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Déconnexion...');
    window.location.href = '/login';
  };

  const handleProfileEdit = () => {
    setEditMode(true);
  };

  const handleProfileSave = () => {
    axios
      .put('http://localhost:3000/utilisateurs/me', profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setProfileData(response.data);
        setEditMode(false);
      })
      .catch((error) => console.error('Failed to update profile:', error));
  };

  const handleAnimalModalOpen = () => {
    setOpenAnimalModal(true);
  };

  const handleAnimalModalClose = () => {
    setOpenAnimalModal(false);
    setNewAnimal({ nom: '', type: '' }); 
  };

  const handleAnimalAdd = () => {
    axios
      .post(
        'http://localhost:3000/animaux',
        { ...newAnimal, proprietaireId: profileData.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .then((response) => {
        setAnimals([...animals, response.data]);
        handleAnimalModalClose();
      })
      .catch((error) => console.error('Failed to add animal:', error));
  };

  const handleAppointmentBooking = () => {
    console.log('Redirect to booking page');
    window.location.href = '/apointements'; 
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="div" gutterBottom align="center" marginBottom={4}>
        Mon Profil
      </Typography>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Informations du Profil
          </Typography>
          <Divider />
          <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Grid item>
              <Person />
            </Grid>
            <Grid item xs>
              {editMode ? (
                <>
                  <TextField
                    label="Nom"
                    variant="outlined"
                    fullWidth
                    value={profileData.nom}
                    onChange={(e) =>
                      setProfileData({ ...profileData, nom: e.target.value })
                    }
                  />
                  <TextField
                    label="Prénom"
                    variant="outlined"
                    fullWidth
                    value={profileData.prenom}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        prenom: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        email: e.target.value,
                      })
                    }
                  />
                </>
              ) : (
                <div>
                  <Typography variant="body1">
                    Nom: {profileData.nom}
                  </Typography>
                  <Typography variant="body1">
                    Prénom: {profileData.prenom}
                  </Typography>
                  <Typography variant="body1">
                    Email: {profileData.email}
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid item>
              {editMode ? (
                <>
                  <IconButton color="primary" onClick={handleProfileSave}>
                    <Save />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    <Cancel />
                  </IconButton>
                </>
              ) : (
                <IconButton color="primary" onClick={handleProfileEdit}>
                  <Edit />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Mes Animaux
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {animals.length > 0 ? (
              animals.map((animal) => (
                <Grid item xs={6} key={animal.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container alignItems="center">
                        <Grid item>
                          <Pets sx={{ marginRight: 2 }} />
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1" component="div">
                            {animal.nom}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Type: {animal.type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body2" align="center" color="textSecondary">
                  Aucun animal n'est enregistré.
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} display="flex" justifyContent="center">
              <IconButton color="primary" onClick={handleAnimalModalOpen}>
                <Add />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={openAnimalModal} onClose={handleAnimalModalClose}>
        <DialogTitle>Ajouter un animal</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom de l'Animal"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAnimal.nom}
            onChange={(e) => setNewAnimal({ ...newAnimal, nom: e.target.value })}
          />
          <TextField
            label="Type d'Animal"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newAnimal.type}
            onChange={(e) => setNewAnimal({ ...newAnimal, type: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnimalModalClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleAnimalAdd} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Mes Rendez-vous
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <Grid item xs={12} key={appointment.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container alignItems="center">
                        <Grid item>
                          <EventNote sx={{ marginRight: 2 }} />
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1" component="div">
                            {appointment.reason}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {appointment.date} avec {appointment.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body2" align="center" color="textSecondary">
                  Aucun rendez-vous n'est pris.
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleAppointmentBooking}>
                Prendre un rendez-vous
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
