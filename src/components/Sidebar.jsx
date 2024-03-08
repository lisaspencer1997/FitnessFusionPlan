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
  Drawer,
  IconButton
} from "@material-tailwind/react";
import {
  NewspaperIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  MusicalNoteIcon,
  CheckIcon,
  WrenchIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from 'react-router-dom';
import WaterCounter from './WaterCounter'
import SpotifyPlaylist from './SpotifyPlaylist'

const Sidebar = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);


  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card className="h-dvh w-full p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Fitness Fusion Planner
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
              <NavLink to="/activity-planner" end>Monthly Activity Planner</NavLink>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <BookOpenIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink to="/food-planner" end>Weekly Food Planner</NavLink>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <NavLink to="/settings" end>Settings</NavLink>
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
                  <WaterCounter />
                </ListItem>
                <ListItem className="flex flex-col" ripple={false}>
                  <div className="flex flex-row me-auto">
                    <ListItemPrefix>
                      <MusicalNoteIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Music Playlist
                  </div>
                  <SpotifyPlaylist />
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
        </Card>
      </Drawer>
    </>
  );
}

export default Sidebar;