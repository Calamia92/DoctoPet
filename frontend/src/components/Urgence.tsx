import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import UrgInfo from "../assets/urgenceInfo.jpg";
import Siren from "../assets/siren.jpg";

const Urgence: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', marginTop: '32px', }}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center'}}>
            En cas d'urgence vétérinaire
        </Typography>
        <Typography 
            variant="body1" 
            sx={{ width: '40%', margin: 'auto', fontStyle: 'italic', fontSize: '1.2rem', color: '#4A4A4A', marginBottom: '32px' }}>
            Nos vétérinaires sont à votre écoute 24h/24. Vous pouvez également chercher la clinique vétérinaire de garde la plus proche de chez vous
        </Typography>
        <div 
            style={{ 
                width: '100%', 
                height: '50vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignContent: 'center', 
                backgroundColor: '#F5F8FF', 
            }}>
            <img src={UrgInfo} alt="Urgence Info" style={{ width: '64%', margin: 'auto' }} />  
            <img 
                src={Siren} 
                alt="Siren d'alarme" 
                style={{ 
                    width: '12%', 
                    transform: 'rotate(-18deg)', 
                    position: 'absolute',
                    top: '76%',
                    left: '10%'
                }} 
            />  
        </div>
        <div style={{ 
            width: '30%',
            margin: '32px auto', 
            padding: '26px 22px', 
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#FF4242', fontWeight: '600', textAlign: 'center' }}>
                Conseils vétérinaires d'urgence
            </Typography>
            <p style={{ color: '#4A4A4A', fontSize: '1.2rem', fontWeight: '400', }}>
                {/* style={{}} */}
                Un vétérinaire Dr DoctoPet vous appelle en quelques minutes !
            </p>
            <p style={{ color: '#31394D', fontSize: '1.3rem', fontWeight: '700', textAlign: 'center', margin: '32px 0px' }}>Tous les jours 24h/24</p>
            <p style={{ color: '#FF4242', fontSize: '1.2rem', marginBottom: '-16px' }}>Par téléphone</p>
            <p style={{ color: '#FF4242', fontSize: '0.9rem', fontWeight: '600', marginBottom: '32px'}}>
                <span style={{ fontSize: '5rem',}}>15€</span>TTC
            </p>
            <div style={{ textAlign: 'center' }}>
                <Button variant="contained" sx={{ textTransform: 'none', fontSize: '1.2rem', fontWeight: '500',}}> 
                    Parler à un vétérinaire
                </Button>
            </div>
        </div>
        <div style={{ marginTop: '62px', padding: '32px 0px', backgroundColor: '#F5F8FF' }}>
            <Typography variant="h4" gutterBottom sx={{  textAlign: 'center', marginTop: '32px' }}>
                Comment fonctionne notre service de vétérinaire en ligne ?
            </Typography>
            <Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between', margin: '42px auto',}}>
                <p style={{ 
                    width: '36%',
                    padding: '26px', 
                    borderRadius: '8px',
                    border: '1px solid #EBEBEB',
                    backgroundColor: '#fff',
                    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}>
                        Vous avez besoin de réponses rapides sur différents sujets concernant votre animal de compagnie ? Vous souhaitez une téléconsultation vétérinaire ? Vous avez des interrogations concernant le bien-être ou l'éducation de votre quatre pattes ? Notre service de vétérinaires en ligne vous permet d'échanger avec un vétérinaire ou un·e vétérinaire tous les jours 24h/24. Des services de grande qualité, prodigués par des vétérinaires passionnés.
                </p>
                <p style={{ 
                    width: '36%',
                    padding: '26px 22px', 
                    borderRadius: '8px',
                    border: '1px solid #EBEBEB',
                    backgroundColor: '#fff', 
                }}>
                        Afin de répondre efficacement à vos besoins, nous vous proposons un service de vétérinaire en ligne. Notre expérience en tant que vétérinaires nous a permis de comprendre qu'il peut être plus facile pour vous d'échanger de votre foyer, rapidement, quelle que soit l'heure. Vous pouvez en effet vous trouver dans l'impossibilité de vous déplacer ou ne souhaitez pas attendre des heures l'arrivée d'un vétérinaire à votre domicile. Sans compter les situations d'urgence pour lesquelles vous attendez des réponses rapides
                </p>
            </Box>
        </div>
    </Box>
  );
};

export default Urgence;
