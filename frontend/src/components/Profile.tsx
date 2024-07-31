import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, Button } from '@mui/material';
import { Person, Email, Phone, ChevronRight } from '@mui/icons-material';

function Profile() {
  // Données fictives pour la démonstration
  const profileData = {
    nomPrenom: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    telephone: '+33 6 12 34 56 78',
  };

  // Fonction pour gérer la déconnexion (ajouter la logique de déconnexion ici)
  const handleLogout = () => {
    console.log("Déconnexion...");
    // Logique de déconnexion à implémenter ici
  };

  return (
    <Container maxWidth="md">
      {/* En-tête avec le titre */}
      <Typography variant="h3" component="div" gutterBottom align="center" marginBottom={4}>
        Mon Profil
      </Typography>

      {/* Liste des cartes */}
      <Grid container spacing={2}>
        {/* Carte pour Nom et Prénom */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <Person sx={{ marginRight: 2 }} />
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" component="div">
                    Nom et Prénom
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profileData.nomPrenom}
                  </Typography>
                </Grid>
                <Grid item>
                  <ChevronRight />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte pour Email */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <Email sx={{ marginRight: 2 }} />
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" component="div">
                    Email
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profileData.email}
                  </Typography>
                </Grid>
                <Grid item>
                  <ChevronRight />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte pour Téléphone */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container alignItems="center">
                <Grid item>
                  <Phone sx={{ marginRight: 2 }} />
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" component="div">
                    Téléphone
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profileData.telephone}
                  </Typography>
                </Grid>
                <Grid item>
                  <ChevronRight />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4} display="flex">
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Déconnexion
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
