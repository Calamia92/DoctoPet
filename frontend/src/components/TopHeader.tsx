import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import SearchBar from '../components/SearchBar';
import Logo from '../assets/Logo.png';

const TopHeader: React.FC = () => {
  const Title = styled(Typography)({
    width: '70%',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Raleway, Poppins, Avenir, Lora, serif',
    fontSize: '3.8rem',
    fontWeight: 'bold',
    // background: 'linear-gradient(to left, #3EB9ED, #2E314A)',
    background: 'linear-gradient(to right, #3EB9ED, #2E314A)', 
    backgroundSize: '160% 200%', 
    WebkitBackgroundClip: 'text', 
    backgroundClip: 'text', 
    color: 'transparent', 
    position: 'relative',
    zIndex: 1,
  });

  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  const [isHoveredConnexion, setIsHoveredConnexion] = useState<boolean>(false);
  const [isHoveredUrgence, setIsHoveredUrgence] = useState<boolean>(false);

  const handleConnexion = () => {
    console.log('Connexion button clicked');
  };

  const handleUrgence = () => {
    console.log('Urgence button clicked');
  };

  return (
    <>
      <Box sx={{ 
        width: '100%',
        height: '150px', 
        backgroundColor: 'white',
        display: 'flex', 
        alignItems: 'center', 
      }}>
        <img 
          src={Logo} alt="Logo" 
          style={{ width: '130px', height: '130px', objectFit: 'cover', marginLeft: '30px' }} 
        />
        <Title variant="h1"> DocPet </Title>
        {/* <SearchBar onSearch={handleSearch}/> */}
        <div style={{ width: '14%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' , backgroundColor: 'white', }}>
          <button
            onClick={handleConnexion}
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
            }}
          >
            Connexion
          </button>
          <button
            onClick={handleUrgence}
            onMouseEnter={() => setIsHoveredUrgence(true)}
            onMouseLeave={() => setIsHoveredUrgence(false)}
            style={{
              padding: '12px 16px',
              backgroundColor: isHoveredUrgence ? '#FF4242' : '#fff',
              color: isHoveredUrgence ? '#fff' : '#FF4242',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: '1px solid #FF4242',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
              marginLeft: '16px',
            }}
          >
            Urgence
          </button>
        </div>
      </Box>
    </>
  );
};

export default TopHeader;
