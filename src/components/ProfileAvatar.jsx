import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
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
    path: "/my-profile",
    icon: UserCircleIcon,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Cog6ToothIcon,
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
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="paragraph"
                className="font-normal"
              >
                <NavLink to={path} end>{label}</NavLink>
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>

    </Menu>
  );
}

export default ProfileAvatar