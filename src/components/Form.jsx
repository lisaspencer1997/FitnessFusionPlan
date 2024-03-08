import React, { useState, useEffect } from "react";
import AvatarComponent from '../components/AvatarComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeightScale } from '@fortawesome/free-solid-svg-icons'
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  Stepper,
  Step,
  Button,
  Alert,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";

const Icon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  )
}

const Form = () => {

  const [dobDate, setDobDate] = React.useState();
  const [milestoneDate, setMilestoneDate] = React.useState();

  const [selectedMacro, setSelectedMacro] = useState("");

  const handleMacroChange = (selectedMacro) => {
    setSelectedMacro(selectedMacro);
    setFormData({
      ...formData,
      macroNutrient: selectedMacro,
    });
  };

  const handleMilestoneDate = (selectedDate) => {
    setMilestoneDate(selectedDate);
    setFormData({
      ...formData,
      milestoneDate: selectedDate,
    });
  };

  const handleDobDate = (selectedDate) => {
    setDobDate(selectedDate);
    setFormData({
      ...formData,
      dob: selectedDate,
    });
  };

  const spotifyPlaceholder = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1EIdeU4uQxY7At?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    setIsLastStep(activeStep === StepContent.length - 1);
    setIsFirstStep(activeStep === 0);
  }, [activeStep]);

  // Set form data value
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    playlist: "",
    milestoneName: "",
    milestoneDate: "",
    macroNutrient: "",
    waterTarget: "",
    weight: ""
  });

  // save to local storage function
  const saveForm2LocalStorage = (data) => {
    localStorage.setItem('FitnessFusionConfig', JSON.stringify(data));
  };

  // Set boolean for open/close status
  const [openAlert, setOpenAlert] = useState(false)

  // State for the alertMessage
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setOpenAlert(false)
  };

  // Function to handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, dob, milestoneDate, milestoneName, macroNutrient, waterTarget, weight } = formData;

    // check if one or more fields are empty
    if (
      name.trim() !== ""
      && dob !== ""
      && milestoneDate !== ""
      && milestoneName.trim() !== ""
      && macroNutrient !== ""
      && waterTarget !== ""
      && weight !== ""
    ) {
      // If yes, console.log the form data and handle the alert message
      console.log("Form submitted:", formData);
      setAlertMessage(`Thanks, ${formData.name}! The information have been saved!`);
      setSuccess(true);
      setOpenAlert(true);
      saveForm2LocalStorage(formData);
    } else {
      // if not render a warning alert message
      setAlertMessage("Please filled out all the fields.");
      setSuccess(false);
      setOpenAlert(true);
    }
  };

  const StepContent = [
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 overflow-hidden">

      <Typography variant="h5" className="col-start-1 col-span-2">
        Tell us a bit of yourself 😀
      </Typography>

      <div className="col-start-1 col-span-2">
        <Input
          label="How shall I call you?"
          placeholder=""
          name="name"
          value={formData.name}
          onChange={handleInputChange} />
      </div>

      <div className='col-start-1 col-span-2 flex flex-col gap-2 md:flex-row'>

        <div className="w-full">
          <Popover placement="bottom">
            <PopoverHandler>
              <Input
                label="Date of Birthday"
                mode="single"
                onChange={() => null}
                value={dobDate ? format(dobDate, "PPP") : ""}
                className="w-full"
              />
            </PopoverHandler>
            <PopoverContent>
              <DayPicker
                mode="single"
                selected={dobDate}
                onSelect={handleDobDate}
                showOutsideDays
                className="border-0"
                classNames={{
                  caption: "flex justify-center py-2 mb-4 relative items-center",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "flex items-center",
                  nav_button:
                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                  nav_button_previous: "absolute left-1.5",
                  nav_button_next: "absolute right-1.5",
                  table: "w-full border-collapse",
                  head_row: "flex font-medium text-gray-900",
                  head_cell: "m-0.5 w-9 font-normal text-sm",
                  row: "flex w-full mt-2",
                  cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal",
                  day_range_end: "day-range-end",
                  day_selected:
                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                  day_today: "rounded-md bg-gray-200 text-gray-900",
                  day_outside:
                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                  day_disabled: "text-gray-500 opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative flex w-full">
          <AvatarComponent />
        </div>

      </div>

      <div className="col-start-1 col-span-2">
        <Input
          label="Please paste here your favorite public Spotify Playlist"
          placeholder={spotifyPlaceholder}
          name="playlist"
          value={formData.playlist}
          onChange={handleInputChange} />
      </div>

    </div>,

    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 overflow-hidden">

      <Typography variant="h5" className="col-start-1 col-span-2">
        What's your goals? 🎯
      </Typography>

      <div className="col-start-1 col-span-2 flex flex-col gap-2 md:flex-row">

        <Input label="Milestone Name"
          placeholder=" "
          name="milestoneName"
          value={formData.milestoneName}
          onChange={handleInputChange} />

        <Popover placement="bottom">
          <PopoverHandler>
            <Input
              label="Milestone Date"
              onChange={() => null}
              value={milestoneDate ? format(milestoneDate, "PPP") : ""}
            />
          </PopoverHandler>
          <PopoverContent>
            <DayPicker
              mode="single"
              selected={milestoneDate}
              onSelect={handleMilestoneDate}
              showOutsideDays
              className="border-0"
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "rounded-md bg-gray-200 text-gray-900",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ ...props }) => (
                  <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                  <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                ),
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="col-start-1 col-span-2">
        <Input
          type="number"
          label="Your ideal weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          icon={<FontAwesomeIcon icon={faWeightScale} />} />
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          Please insert a number in Kg.
        </Typography>
      </div>

    </div>,

    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 overflow-hidden">

      <Typography variant="h5" className="col-start-1 col-span-2">
        Let's talk about Food! 🥬
      </Typography>

      <div className="col-start-1 col-span-2 flex flex-col gap-2 md:flex-row">

        <div className="w-full">
          <Select
            label="Select a macronutrient"
            name="macroNutrient"
            value={selectedMacro}
            onChange={handleMacroChange}
          >
            <Option value="protein">Protein</Option>
            <Option value="carbohydrates">Carbohydrates</Option>
            <Option value="fats">Fats</Option>
          </Select>
        </div>
        <div className="w-full">
          <Input
            label="Your water target in Litres"
            name="waterTarget"
            value={formData.waterTarget}
            onChange={handleInputChange}
            placeholder="1"
            type="number"
            step="0.20"
            min="0"
          />
        </div>

      </div>
    </div>,
  ];

  return (
    //Form component
    <form className="w-full flex flex-col justify-between" onSubmit={handleSubmit}>

      {/* Displaying related content based on the stepper position */}
      {StepContent[activeStep]}
      <Alert
        icon={<Icon />}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        // Change color of the Alert container based on the status of the form
        className={`rounded-none border-l-4 font-medium ${success ? 'border-s-5 bg-teal-800 border-teal-900	rounded-md my-4 text-white' : 'border-s-5 bg-red-500 border-red-900	rounded-md my-4 text-white'}`}>
        {alertMessage}
      </Alert>

      <div className="mb-8 mt-auto">
        {/* Stepper component */}
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>😀</Step>
          <Step onClick={() => setActiveStep(1)}>🎯</Step>
          <Step onClick={() => setActiveStep(2)}>🥬</Step>
        </Stepper>
        <div className="mt-8 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          {/* Checking if it's the last step to display Save 🎉 label */}
          {isLastStep ? (
            <Button onClick={handleNext} type="submit">
              Save 🎉
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          )}
        </div>
      </div>

    </form>
  );
}

export default Form;