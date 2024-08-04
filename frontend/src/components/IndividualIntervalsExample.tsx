import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import Testimony1 from '../assets/temoin1.jpg';
import Testimony2 from '../assets/temoin2.jpg';
import Testimony3 from '../assets/temoin3.jpg';

const IndividualIntervalsExample: React.FC = () => {

    const carouselStyle: React.CSSProperties = {
        width: '70%',
        height: '200px',
        paddingLeft: '10%',
        borderRadius: '12px',
        backgroundColor: '#C0C0C0',
    };

  return (
    <Carousel style={carouselStyle}>
      <Carousel.Item interval={4000}>
        <ExampleCarouselImage src={Testimony1} alt="Témoignage 1" />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <ExampleCarouselImage src={Testimony2} alt="Témoignage 2" />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <ExampleCarouselImage src={Testimony3} alt="Témoignage 3" />
      </Carousel.Item>
    </Carousel>
  );
};

export default IndividualIntervalsExample;
