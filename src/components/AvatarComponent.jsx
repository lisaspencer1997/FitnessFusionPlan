import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";

const AvatarComponent = () => {
  const [base64Image, setBase64Image] = useState('');

  // function to handle file change from the input
  const handleFileChange = async (event) => {
    // get the image
    const image = event.target.files[0];
  };

  // input file component
  return (
      <Input />
  );
};

export default AvatarComponent;