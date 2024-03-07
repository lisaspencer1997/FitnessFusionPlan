import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  Option,
  Spinner,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel
} from "@material-tailwind/react";
import {
  StopIcon,
  Square2StackIcon,
  Square3Stack3DIcon
} from "@heroicons/react/24/outline";

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

  // dropdown selection for the query input
  const handleMuscleChange = (selectedMuscle) => {
    setMuscle(selectedMuscle);
  };

  // Tab selection object
  const data = [
    {
      label: "Beginner Sets",
      value: "beginner",
      icon: StopIcon,
      desc: `${exerciseData ? exerciseData[0]["Beginner Sets"] : ""}`,
    },
    {
      label: "Intermediate Sets",
      value: "intermediate",
      icon: Square2StackIcon,
      desc: `${exerciseData ? exerciseData[0]["Intermediate Sets"] : ""}`,
    },
    {
      label: "Expert Sets",
      value: "expert",
      icon: Square3Stack3DIcon,
      desc: `${exerciseData ? exerciseData[0]["Expert Sets"] : ""}`,
    },
  ];

  return (
    <div className='w-full p-10'>
      {/* heading */}
      <Typography variant="h4" color="blue-gray">
        Exercise Finder
      </Typography>
      <div className='w-full mt-4'>
        {/* select component */}
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
      {/* tailwind loader */}
      {loading && <Spinner className='mx-auto pt-8' />}
      {error && <p>Error: {error.message}</p>}
      {exerciseData && (
        <div className="overflow-hidden">
          {/* mapping through the api result creating cards */}
          {exerciseData.map((x) => (
            <Card className="mt-6 w-full shadow-lg" key={x.id}>
              <CardBody>
                <div className='flex flex-row gap-2 content-center mb-4'>
                  <Typography variant="h5" color="blue-gray">
                    {x.WorkOut}
                  </Typography>
                  <Chip value={x.Intensity_Level} className="rounded-full" />
                </div>
                <Typography>
                  {x["Long Explanation"]}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                {/* tabs selector */}
                <Tabs value="dashboard">
                  <TabsHeader>
                    {data.map(({ label, value, icon }) => (
                      <Tab key={value} value={value}>
                        <div className="flex items-center gap-2">
                          {React.createElement(icon, { className: "w-5 h-5" })}
                          {label}
                        </div>
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    {data.map(({ value, desc }) => (
                      <TabPanel key={value} value={value}>
                        {desc}
                      </TabPanel>
                    ))}
                  </TabsBody>
                </Tabs>
                {/* button to yt video */}
                <a href={x.Video} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined" className='w-full mt-4'>Go to YouTube</Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseComponent;
