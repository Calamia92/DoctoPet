// Footer.tsx

import React from 'react';
import '../styles/Footer.css';
import Logo from '../assets/Logo.png';

const Footer: React.FC = () => {
    return (
        <footer className="footer-distributed">
            <div className="footer-left">
                <img 
                    src={Logo} alt="Logo" 
                    style={{ width: '130px', height: '130px', objectFit: 'cover', marginLeft: '30px' }} 
                />
                <p className="footer-links">
                    <a href="#" className="link-1">Home</a>
                    <a href="#">Pricing</a>
                    <a href="#">Contact</a>
                </p>
                <p className="footer-company-name">DoctoPet © 2015</p>
            </div>
            <div className="footer-center">
                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
                </div>
                <div>
                    <i className="fa fa-phone"></i>
                    <p>01.00.01.00.01</p>
                </div>
                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:support@doctopet.com">support@doctopet.com</a></p>
                </div>
            </div>
            <div className="footer-right">
                <p className="footer-company-about">
                    <span>About DoctoPet</span>
                    Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                </p>
                <div className="footer-icons">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-github"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
