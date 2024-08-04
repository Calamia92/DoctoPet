import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Button,
  Grid,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Appointment {
  id: string;
  status: string;  
  name: string;    
  reason: string;
  date: string;
}

interface Cabinet {
  id: string;
  nom: string;
}

interface Animal {
  id: string;
  nom: string;
  type: string;
  proprietaireId: string;
}

const AppointmentComponent: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cabinets, setCabinets] = useState<Cabinet[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    status: '',
    name: '',
    reason: '',
    date: new Date(),
    userId: localStorage.getItem('userId') || '', 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentResponse, cabinetResponse, animalResponse] = await Promise.all([
          axios.get('http://localhost:3000/appointments', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get('http://localhost:3000/cabinets', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get('http://localhost:3000/animaux', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);

        console.log('Appointments:', appointmentResponse.data);
        console.log('Cabinets:', cabinetResponse.data);
        console.log('Animals:', animalResponse.data);

        setAppointments(appointmentResponse.data);
        setCabinets(cabinetResponse.data);

        const userId = localStorage.getItem('userId');
        if (userId) {
          const userAnimals = animalResponse.data.filter(
            (animal: Animal) => animal.proprietaireId === userId
          );
          console.log('User Animals:', userAnimals);
          setAnimals(userAnimals);
        } else {
          console.error('User ID not found in localStorage');
          setError('User ID not found. Please log in again.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({ ...formData, date });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.userId) {
        setError('User ID not found. Please log in again.');
        return;
      }

      await axios.post('http://localhost:3000/appointments', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const response = await axios.get('http://localhost:3000/appointments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      setAppointments(response.data);
      setFormData({
        status: '',
        name: '',
        reason: '',
        date: new Date(),
        userId: formData.userId,
      });
    } catch (err) {
      console.error('Failed to create appointment:', err);
      setError('Failed to create appointment.');
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="div">
            Mes rendez-vous
          </Typography>
        </Grid>
        <Divider style={{ margin: '16px 0' }} />
        <form onSubmit={handleFormSubmit}>
          <TextField
            select
            label="Animal"
            name="status"  
            value={formData.status}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            {animals.map((animal) => (
              <MenuItem key={animal.id} value={animal.nom}>
                {animal.nom}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            label="Nom du Médecin"
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            {cabinets.map((cabinet) => (
              <MenuItem key={cabinet.id} value={cabinet.nom}>
                {cabinet.nom}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Motif"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <DatePicker
            selected={formData.date}
            onChange={(date: Date | null) => handleDateChange(date)}
            dateFormat="yyyy-MM-dd"
            customInput={
              <TextField
                variant="outlined"
                label="Date"
                fullWidth
                margin="normal"
              />
            }
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ajouter le rendez-vous
          </Button>
        </form>

        <Divider style={{ margin: '16px 0' }} />

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={1}
            borderColor="red"
            borderRadius={4}
            p={2}
            mt={2}
          >
            <ErrorOutline color="error" style={{ marginRight: 8 }} />
            <Typography color="error">{error}</Typography>
          </Box>
        ) : appointments.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Animal</TableCell> 
                <TableCell>Nom du Spécialiste</TableCell>
                <TableCell>Motif</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.status}</TableCell> 
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={1}
            borderColor="grey"
            borderRadius={4}
            p={2}
            mt={2}
          >
            <ErrorOutline color="error" style={{ marginRight: 8 }} />
            <Typography color="textSecondary">
              Vous n'avez pas de rendez-vous.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentComponent;
