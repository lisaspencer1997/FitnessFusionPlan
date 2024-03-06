import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
  ListItemPrefix,
  ButtonGroup,
  Button,
} from "@material-tailwind/react";
import {
  NewspaperIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  MusicalNoteIcon,
  CheckIcon,
  WrenchIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';
import WaterCounter from './WaterCounter'

const Sidebar = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Fitness Fusion 
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <NewspaperIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/" end>Dashboard</NavLink>
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <CalendarDaysIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/activity-planner" end>Activity Planner</NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/settings" end>Settings</NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/user-form" end>User Form</NavLink>
        </ListItem>
      </List>
      <hr className="my-2 border-blue-gray-50" />
      <Accordion
        open={open === 2}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
          />
        }
      >
        <ListItem className="ps-2" selected={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
            <ListItemPrefix>
              <WrenchIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Tools
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            <ListItem className="flex flex-col" ripple={false}>
              <div className="flex flex-row me-auto">
                <ListItemPrefix>
                  <CheckIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Water Counter
              </div>
                <ButtonGroup fullWidth={true} className='mt-3'>
                  <Button><MinusCircleIcon /></Button>
                  <Button disabled={true}>600 ml</Button>
                  <Button><PlusCircleIcon /></Button>
                </ButtonGroup>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <MusicalNoteIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Music Playlist
            </ListItem>
          </List>
        </AccordionBody>
      </Accordion>
    </Card>
  );
}

export default Sidebar;