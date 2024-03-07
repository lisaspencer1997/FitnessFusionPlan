import React, { useState, useEffect } from 'react';
import axios from 'axios';
import
{
  Select,
  Option,
  Spinner,
  Typography
} from "@material-tailwind/react";

const ExerciseComponent = () => {
  const [muscle, setMuscle] = useState('');
  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (muscle) {
        setLoading(true);
        const options = {
          method: 'GET',
          url: 'https://work-out-api1.p.rapidapi.com/search',
          params: { Muscles: muscle },
          headers: {
            'X-RapidAPI-Key': '73ad17c59dmsheaa0640eff87d20p14d65fjsn9b971912aa01',
            'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
          }
        };

        try {
          const response = await axios.request(options);
          setExerciseData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [muscle]);

  const handleMuscleChange = (selectedMuscle) => {
    setMuscle(selectedMuscle);
  };

  return (
    <div className='w-full p-10'>
      <Typography variant="h4" color="blue-gray">
        Exercise Finder
      </Typography>
      <div className='w-full mt-4'>
        <Select
          label="Select a muscle you want to train"
          name="muscle"
          value={muscle}
          onChange={handleMuscleChange}
        >
          <Option value="">Select a muscle...</Option>
          <Option value="Biceps">Biceps</Option>
          <Option value="Triceps">Triceps</Option>
          <Option value="Chest">Chest</Option>
          <Option value="Back">Back</Option>
          <Option value="Legs">Legs</Option>
          <Option value="Abs">Abs</Option>
          <Option value="Stretching">Stretching</Option>
          <Option value="Warm Up">Warm Up</Option>
          <Option value="Lats">Lats</Option>
          <Option value="Hamstring">Hamstring</Option>
          <Option value="Calves">Calves</Option>
          <Option value="Quadriceps">Quadriceps</Option>
          <Option value="Trapezius">Trapezius</Option>
          <Option value="Shoulders">Shoulders</Option>
          <Option value="Glutes">Glutes</Option>
        </Select>
      </div>
      {loading && <Spinner className='mx-auto pt-8' />}
      {error && <p>Error: {error.message}</p>}
      {exerciseData && (
        <div>

          <pre>{JSON.stringify(exerciseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExerciseComponent;
