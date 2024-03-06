import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";

const AvatarComponent = () => {
  const [base64Image, setBase64Image] = useState('');

  // function to handle file change from the input
  const handleFileChange = async (event) => {
    // get the image
    const image = event.target.files[0];
  };

  // function to convert image to base64
  //! code from MDN WEB DOCS https://developer.mozilla.org/pt-BR/docs/Web/API/FileReader/load_event
  const image2base64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(image);
    });
  };

  // input file component
  return (
      <Input />
  );
};

export default AvatarComponent;