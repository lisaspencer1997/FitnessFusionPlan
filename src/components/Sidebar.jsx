import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  NewspaperIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h3" color="blue-gray">
          FitnessFusion
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
      </List>
    </Card>
  );
}

export default Sidebar;