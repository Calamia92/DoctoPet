import React, { useState } from 'react';
import '../styles/Slider.css'; 
import ImageLoader from './SliderImageLoader'; 


interface Logo {
  id?: string | number;
  src: string;
  alt: string;
}

interface SliderProps {
  logos: Logo[];
}

const Slider: React.FC<SliderProps> = React.memo(({ logos }) => {
    return (
        <div className="sliderMainContainer">
          <div className="sliderContainer">
            <div className="sliderList">
              {logos.map((logo, index) => (
                <div key={`logo-${logo.id || index}`} className="logocards">
                  <ImageLoader src={logo.src} alt={logo.alt} />
                </div>
              ))}
              
              {/* Duplication of logos for the infinite loop effect */}
              {logos.map((logo, index) => (
                <div key={`logo-dup-${logo.id || index}`} className="logocards">
                  <ImageLoader src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
    
          {/* Second Slider */}
          {/* <div className="secondSliderContainer">
            <div className="secondSliderList">
              {logos.map((logo, index) => (
                <div key={`logo-${logo.id || index}`} className="stallionLogocards">
                  <img
                    src="/logo.png"
                    alt="Stallion Signs Logo"
                    style={{ width: '53px', height: 'auto', display: 'block' }} 
                  />
                </div>
              ))}
              {logos.map((logo, index) => (
                <div key={`logo-dup-${logo.id || index}`} className="stallionLogocards">
                  <img
                    src="/logo.png"
                    alt="Stallion Signs Logo"
                    width={1}
                    height={1}
                    style={{ display: 'block' }} 
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      );
    });
    

export default Slider;
