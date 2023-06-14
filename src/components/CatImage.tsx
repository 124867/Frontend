import React from 'react';

interface ICatImageProps {
  imagePath: string;
}

const CatImage: React.FC<ICatImageProps> = ({ imagePath }) => {
  const fallbackImg = 'https://via.placeholder.com/150';
  const imgSrc = imagePath ? imagePath : fallbackImg;

  return (
    <img src={imgSrc} alt="cat image" width="150" height="150"/>
  );
};

export default CatImage;
