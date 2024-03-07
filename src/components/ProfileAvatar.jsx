import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    path: "/",
    icon: UserCircleIcon,
    isComingSoon: true
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Cog6ToothIcon,
    isComingSoon: false
  },
];

// component
const ProfileAvatar = () => {

  const [loadedBase64Image, setLoadedBase64Image] = useState('');

  useEffect(() => {
    loadBase64ImageFromLocalStorage();
  }, [loadedBase64Image]);

  // Load the stored image and set using react state
  const loadBase64ImageFromLocalStorage = () => {
    try {
      const storedImage = localStorage.getItem('base64Image');
      if (storedImage) {
        setLoadedBase64Image(storedImage);
      }
    } catch (error) {
      console.error('Error loading base64 image from local storage:', error);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (

    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={loadedBase64Image ? loadedBase64Image : '/images/defaultAvatar.png'}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path, isComingSoon }, key) => {
          return (
            <MenuItem
              key={key}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded overflow-visible`}
              disabled={isComingSoon}
            >
              {React.createElement(icon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Badge content={isComingSoon ? "Coming Soon!" : ""} color={isComingSoon ? "red" : "green"} className="w-auto whitespace-nowrap absolute top-1 -right-2">
                <Typography
                  as="span"
                  variant="paragraph"
                  className="font-normal w-full"
                >
                  <NavLink to={path} end>{label}</NavLink>
                </Typography>
              </Badge>
            </MenuItem>
          );
        })}
      </MenuList>

    </Menu>
  );
}

export default ProfileAvatar