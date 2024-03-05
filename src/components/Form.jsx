import React, { useState, useEffect } from "react";
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeightScale } from '@fortawesome/free-solid-svg-icons'

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const Form = () => {

  const [date, setDate] = useState();
  const [dob, setDob] = useState();

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
    DOB: "",
    milestoneDate: "",
    milestoneLabel: ""
  });

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
    const { name, email, message } = formData;

    // check if one or more fields are empty
    if (name.trim() !== "" && DOB.trim() !== "" && milestoneDate !== "" && milestoneLabel !== "") {
      // If yes, console.log the form data and handle the alert message
      console.log("Form submitted:", formData);
      setFormData({
        name: "",
        DOB: "",
        milestoneDate: "",
        milestoneLabel: ""
      });
      setAlertMessage(`Thanks, ${formData.name}! The information have been saved!`);
      setSuccess(true);
      setOpenAlert(true);
    } else {

      // if not render a warning alert message
      setAlertMessage("Please filled out all the fields.");
      setSuccess(false);
      setOpenAlert(true);
    }
  };

  const StepContent = [
    <div className="flex flex-col gap-4">
      <Typography variant="h5">
        Tell us a bit of yourself 😀
      </Typography>
      <Input
        label="First Name"
        placeholder=""
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />

      <div className='flex flex-row gap-2'>
        <Popover placement="bottom">
          <PopoverHandler>
            <Input
              label="Date of Birthday"
              onChange={() => null}
              value={dob ? format(dob, "PPP") : ""}
            />
          </PopoverHandler>
          <PopoverContent>
            <DayPicker
              mode="single"
              selected={dob}
              onSelect={setDob}
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
        <div className="relative flex w-full">
          <Input
            type="file"
            label="Upload an avatar"
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
        </div>
      </div>

    </div>,
    <div className="flex flex-col gap-4">

      <Typography variant="h5">
        What's your goals? 🎯
      </Typography>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Input label="Milestone Name"
            placeholder=" "
            name="milestoneLabel"
            value={formData.milestoneLabel}
            onChange={handleInputChange}
          />

          <Popover placement="bottom">
            <PopoverHandler>
              <Input
                label="Milestone Date"
                onChange={() => null}
                value={date ? format(date, "PPP") : ""}
              />
            </PopoverHandler>
            <PopoverContent>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
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
        <div className="w-full">
          <Input type="number" label="Your ideal weight" icon={<FontAwesomeIcon icon={faWeightScale} />} />
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
      </div>
    </div>,
    <div className="flex flex-col gap-4">

      <Typography variant="h5">
        Let's talk about Food! 🥬
      </Typography>

      <div className="flex flex-row gap-2">

        <div className="w-full">
          <Select label="Select a macronutrient">
            <Option>Protein</Option>
            <Option>Carbohydrates</Option>
            <Option>Fats</Option>
          </Select>
        </div>
        <div className="w-full">
          <Input
            label="Your water target in Litres"
            placeholder="1"
            name="waterTarget"
            type="number"
            step="0.20"
            min="0"
          />
        </div>

      </div>
    </div>,
  ];

  return (
    <div className="w-full h-[calc(100%-5rem)] p-10 flex flex-col gap-8">

      {StepContent[activeStep]}

      <div className="mt-auto">
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
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>
      </div>

    </div>
  );
}

export default Form;