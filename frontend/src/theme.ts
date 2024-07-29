import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E294E', // Couleur primaire
    },
    secondary: {
      main: '#003399', // Couleur secondaire
    },
    text: {
      primary: '#fffffc', // Couleur du texte
    },
    background: {
      default: '#FCDC4D', // Couleur d'arrière-plan commune
      paper: '#FCDC4D', // Couleur d'arrière-plan des composants (comme Drawer)
    },
  },
});

export default theme;
