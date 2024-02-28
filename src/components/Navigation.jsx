import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <div>
        <NavLink to="/" end>Dashboard</NavLink>
      </div>
      <div>
        <NavLink to="settings" end>Settings</NavLink>
      </div>
    </nav>
  );
}

export default Navigation;