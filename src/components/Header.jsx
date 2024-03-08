import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import ProfileAvatar from './ProfileAvatar';
import Sidebar from './Sidebar';

const Header = () => {
 
  return (
    <Navbar
      fullWidth={true}
      blurred={true}
      className="flex flex-row h-20 justify-between rounded-none shadow-xl shadow-blue-gray-900/10 z-50 sticky top-0 mb-8">
      <Sidebar />
      <div className="flex text-blue-gray-900 w-full">
        <Typography
          variant="h3"
          className="ms-4 me-auto py-1"
        > Nicola
        </Typography>
        <ProfileAvatar />
      </div>
    </Navbar>
  );
}

export default Header