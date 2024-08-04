import React from 'react';

interface ExampleCarouselImageProps {
  src: string;
  alt: string;
}

const ExampleCarouselImage: React.FC<ExampleCarouselImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} style={{ width: '800px', height: 'auto', }} />;
};

export default ExampleCarouselImage;
