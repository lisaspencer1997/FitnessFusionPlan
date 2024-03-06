import React, { useState } from 'react';
import { Input } from "@material-tailwind/react";

const AvatarComponent = () => {
  const [base64Image, setBase64Image] = useState('');

  // function to handle file change from the input
  const handleFileChange = async (event) => {
    // get the image
    const image = event.target.files[0];

    // if the image is there
    if (image) {
      try {
        // convert the image
        const base64Image = await image2base64(image);
        // use the set State to assign to base64Image
        setBase64Image(base64Image);
        //store it in the Local Storage
        localStorage.setItem('base64Image', base64Image);
      } catch (error) {
        // handle errors
        console.error('Error converting image to base64:', error);
      }
    }
  };

  // function to convert image to base64
  //! code from MDN WEB DOCS https://developer.mozilla.org/en-US/docs/Web/API/FileReader/load_event
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
    <Input
      type="file"
      label="Upload an avatar"
      name="avatarBase64L"
      onChange={handleFileChange}
      accept=".jpeg, .jpg, .png, .webp" // accepting images only
      size="md" // accepting medium files
      className="block w-full text-sm text-slate-500
          file:py-1.5
          file:px-3
          file:mt-1
          file:border-0
          file:text-sm
          file:font-semibold
          file:bg-gray-900
          file:text-white
          file:!absolute
          file:right-0
          file:top-0
          file:rounded-md
          hover:file:cursor-pointer"
    />
  );
};

export default AvatarComponent;