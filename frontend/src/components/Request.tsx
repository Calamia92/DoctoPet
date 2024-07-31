import React, { useState } from 'react';
import { Container, TextField, Grid, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';

function Request() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [telephone, setTelephone] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [objetDemande, setObjetDemande] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({
      nom,
      prenom,
      codePostal,
      telephone,
      specialite,
      objetDemande
    });
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mb={2}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Vous êtes un praticien :
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField 
              label="Nom" 
              variant="outlined" 
              fullWidth 
              value={nom} 
              onChange={(e) => setNom(e.target.value)} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              label="Prénom" 
              variant="outlined" 
              fullWidth 
              value={prenom} 
              onChange={(e) => setPrenom(e.target.value)} 
            />
          </Grid>

          <Grid item xs={6}>
            <TextField 
              label="Code Postal du cabinet" 
              variant="outlined" 
              fullWidth 
              value={codePostal} 
              onChange={(e) => setCodePostal(e.target.value)} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              label="Téléphone" 
              variant="outlined" 
              fullWidth 
              value={telephone} 
              onChange={(e) => setTelephone(e.target.value)} 
            />
          </Grid>

          <Grid item xs={12}>
            <TextField 
              label="Spécialité" 
              variant="outlined" 
              fullWidth 
              value={specialite} 
              onChange={(e) => setSpecialite(e.target.value)} 
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Objet de la demande</InputLabel>
              <Select 
                label="Objet de la demande" 
                value={objetDemande} 
                onChange={(e) => setObjetDemande(e.target.value)}
              >
                <MenuItem value="">
                  <em>Aucun</em>
                </MenuItem>
                <MenuItem value="Consultation">Consultation</MenuItem>
                <MenuItem value="Urgence">Urgence</MenuItem>
                <MenuItem value="Rendez-vous de suivi">Rendez-vous de suivi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Valider votre demande
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Request;
