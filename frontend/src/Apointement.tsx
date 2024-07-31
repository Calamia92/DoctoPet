import React from 'react';
import { Card, CardContent, Typography, Table, TableHead, TableBody, TableRow, TableCell, Divider, Button, Grid, Box } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

const appointments = [
  { status: 'Disponible', name: 'Dr. Jean Dupont', reason: 'Consultation générale', date: '2024-08-01', action: '' },
  { status: 'Indisponible', name: 'Dr. Marie Curie', reason: 'Suivi post-opératoire', date: '2024-08-02', action: '' },
  { status: 'En attente', name: 'Dr. Albert Einstein', reason: 'Nouvelle consultation', date: '2024-08-03', action: '' },
];

const Appointment = () => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5" component="div">
            Mes rendez-vous
          </Typography>
          <Button variant="contained" color="primary">
            Prendre un rendez-vous
          </Button>
        </Grid>
        <Divider style={{ margin: '16px 0' }} />
        {appointments.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Nom du Spécialiste</TableCell>
                <TableCell>Motif</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell><Divider variant="middle" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" border={1} borderColor="red" borderRadius={4} p={2} mt={2}>
            <ErrorOutline color="error" style={{ marginRight: 8 }} />
            <Typography color="error">
              Vous n'avez pas de rendez-vous.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Appointment;
