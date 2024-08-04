import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css'; 
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import VetBg from '../assets/vet_bg.jpg';
import MedKit from '../assets/bg_medicalKit.png';
import MedOffice from '../assets/hospital-building.png';
import MedOnline from '../assets/online-doctor.png';
import MedOnHouse from '../assets/house.png';
import EcouteIcon from '../assets/ecouteIcon.jpg';
import SuiviIcon from '../assets/suiviIcon.jpg';
import FormationIcon from '../assets/formationIcon.jpg';
import ConfianceIcon from '../assets/confianceIcon.jpg';
import TopHeader from './TopHeader';
import Footer from './Footer';
import AnimalSlider from './Slider';
import IndividualIntervalsExample from './IndividualIntervalsExample';



const HomePage: React.FC = () => {

    const [animalIcons, setAnimalIcons] = useState<{ src: string, alt: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const response = await fetch('/assets/SliderPics/animalPics.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const logoFiles: string[] = await response.json();
                
                // Construct image URLs
                const logoUrls = logoFiles.map(file => ({
                    src: `/assets/SliderPics/${file}`,
                    alt: file.replace(/\.[^/.]+$/, '')
                }));

                setAnimalIcons(logoUrls);
            } catch (error) {
                console.error("Failed to load logos:", error);
            }
        };

        fetchLogos();
    }, []);

    const BackgroundBox = styled(Box)({
        width: '47%',
        height: '72vh',
        position: 'relative',
        // backgroundColor: '#398FBB',
        backgroundImage: `url(${MedKit})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '272px 0px 0px 34px',
    });

    const VetPicBox = styled(Box)({
        width: '540px',
        height: '74vh',
        position: 'absolute',
        top: '6%',
        left: '10%',
        backgroundImage: `url(${VetBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: '12px solid white',
        borderRadius: '264px 264px 4px 4px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    });

    return (
        <div className="mainContainer">
            <TopHeader />
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', backgroundColor: 'white', }}>
                <div style={{ width: '50%', backgroundColor: 'white',}}>
                    <motion.div 
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '30px',
                            marginLeft: '20px',
                        }}
                        initial={{ y: '-100%', opacity: 0, scale: 0.5 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                        <h1 className="title1">Un Vétérinaire de Confiance</h1>
                        <h1 className="title2">pour tous Animaux Doméstiques</h1>
                        <p className="description">
                            Votre partenaire de confiance pour tous les besoins de santé de vos animaux. Connectez-vous avec des vétérinaires, prenez des rendez-vous et suivez la santé de votre animal en toute simplicité
                        </p>
                        {/* <Button className="startButton" variant="contained" size="large">
                            Consulter
                        </Button> */}
                    </motion.div>
                    <Box className="offersRedirection">
                        <div 
                            className="firstCard" 
                            onClick={() => navigate('/sur-place')}
                        >
                            Sur Place <span className="icons"><img src={MedOffice} alt="Cabinet Médical" /></span>
                        </div>
                        <div 
                            className="middleCard" 
                            onClick={() => navigate('/en-ligne')}
                        >
                            En Ligne <span className="icons"><img src={MedOnline} alt="Consultation En Ligne" /></span>
                        </div>
                        <div 
                            className="lastCard" 
                            onClick={() => navigate('/a-domicile')}
                        >
                            À Domicile <span className="icons"><img src={MedOnHouse} alt="Consultation Domicile" /></span>
                        </div>
                    </Box>
                </div>
                
                <BackgroundBox>
                    <VetPicBox/>
                </BackgroundBox>
            </Box>
            <Box className="dummyBox"></Box>
            <AnimalSlider logos={animalIcons}/>
            <Box className="engagementQualiteContainer">
                <h1 className="engagementQualiteTitle">Nos engagements qualité</h1>
                <Box className="engagementQualite" sx={{marginBottom: '52px'}}>
                    <div>
                        <span><img src={FormationIcon} alt="Formation icone" /></span>
                        <h3>Formation</h3>
                        <p>100% des médecins sont formés à la téléconsultation par DocPet. Ils sont inscrits à l'Ordre et exercent en France, en cabinet ou à l'hôpital</p>
                    </div>
                    <div>
                        <span><img src={EcouteIcon} alt="Ecoute icone" /></span>
                        <h3>Ecoute</h3>
                        <p>Les médecins prennent le temps nécessaire pour chaque patient et s'adaptent à votre situation</p>
                    </div>
                </Box>
                <Box className="engagementQualite">
                    <div>
                        <span><img src={SuiviIcon} alt="Suivi icone" /></span>
                        <h3>Suivi</h3>
                        <p>Vous bénéficiez d'un suivi après vos téléconsultations. Vous pouvez facilement reprendre RDV avec votre équipe de médecins</p>
                    </div>
                    <div>
                        <span><img src={ConfianceIcon} alt="Confiance icone" /></span>
                        <h3>Confiance</h3>
                        <p>Notre Direction médicale suit en continu 15 indicateurs de qualité, pour veiller à la qualité des soins délivrés</p>
                    </div>
                </Box>
            </Box>
            {/* <Box className="dummyBox"></Box> */}
            <Box className="carouselContainer">
                <h2>Ils Témoignent</h2>
                <Box className="carousel">
                    <IndividualIntervalsExample />
                </Box>
            </Box>
            <Box className="dummyBox"></Box>
            <Footer/>
        </div>
    );
}

export default HomePage;
