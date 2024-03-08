import { Carousel } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FitnessCarousel = () => {
  const [photoUrls, setPhotoUrls] = useState([]);

  // fetch once only, when the component is being mounted
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            query: 'fitness',
            count: 10,
            client_id: '4kHQS1PZnjWB8ZHGDVYjgUbgZ4qJTG9epRvn4GSaNN4',
          },
        });
        // store in a variable
        const newPhotoUrls = response.data.map((photoData) => photoData.urls.regular);
        setPhotoUrls(newPhotoUrls);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);
 
  return (
    // return the carousel  and
    <Carousel className="rounded-xl w-full h-full">
      {/* map over the URL */}
      {photoUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          autoPlay={true}
          loop={true}
          alt="fitness image carousel"
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}

export default FitnessCarousel;