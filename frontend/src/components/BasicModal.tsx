import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Height } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Login from "../Login";
import SignUp from '../SignUp';

const style = {
  width: '50%',
  height: '60vh',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  
  const [open, setOpen] = useState<boolean>(false);
  const [isHoveredConnexion, setIsHoveredConnexion] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleForm = () => {
    setShowLogin(!showLogin); 
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        onMouseEnter={() => setIsHoveredConnexion(true)}
        onMouseLeave={() => setIsHoveredConnexion(false)}
        style={{
          padding: '12px 16px',
          backgroundColor: isHoveredConnexion ? '#1976D2' : '#fff',
          color: isHoveredConnexion ? '#fff' : '#212121',
          fontSize: '1rem',
          border: '1px solid #1976D2',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background-color 0.3s, color 0.3s',
          marginLeft: '10px',
        }}>
        Connexion
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {showLogin ? (
            <Login marginTop="6vh" toggleForm={toggleForm} /> 
          ) : (
            <SignUp marginTop="2vh" toggleForm={toggleForm} /> 
          )}
        </Box>
      </Modal>
    </div>
  );
}
