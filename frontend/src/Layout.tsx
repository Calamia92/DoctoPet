import React, { useState, ReactNode } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import PetsIcon from "@mui/icons-material/Pets";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FmdBadIcon from '@mui/icons-material/FmdBad';


// Define the width of the drawer
const drawerWidth = 240;

// Opened drawer styles
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Closed drawer styles
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

// Drawer header styling
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// AppBar styling with conditional logic based on the open state
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: '#4CAF50', // Use hex color for AppBar
}));

// Drawer styling with conditional logic based on the open state
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  backgroundColor: '#A5D6A7', // Use hex color for Drawer
}));

// Define props for Layout component
interface LayoutProps {
  children: ReactNode;
}

// Main Layout component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false); // Manage drawer state
  const navigate = useNavigate(); // Use navigate for routing
  const isAuthenticated = !!localStorage.getItem('token'); // Check authentication status

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}> {/* Fix AppBar position */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }), 
            }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar src="./assets/dog.jpeg" alt="Logo" sx={{ height: 40, width: 40, marginRight: 2 }} />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            DoctoPet
          </Typography>
          {isAuthenticated ? (
            <>
              <IconButton color="inherit" component={Link} to="/profile">
                <AccountCircleIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Se Connecter
              </Button>
              <Button color="inherit" component={Link} to="/">
                S'inscrire
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
          <ListItem button component={Link} to="/apointements">
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
          <ListItem button component={Link} to="/urgence">
            <ListItemIcon>
              <FmdBadIcon />
            </ListItemIcon>
            <ListItemText primary="Documents" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/sur-place">
            <ListItemIcon>
              <LocationOnTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="Sur Place" />
          </ListItem>
          <ListItem button component={Link} to="/en-ligne">
            <ListItemIcon>
              <DevicesTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="En Ligne" />
          </ListItem>
          <ListItem button component={Link} to="/a-domicile">
            <ListItemIcon>
              <MapsHomeWorkTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="A Domicile" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default }}>
        <DrawerHeader />
        {children} 
      </Box>
    </Box>
  );
};

export default Layout;
