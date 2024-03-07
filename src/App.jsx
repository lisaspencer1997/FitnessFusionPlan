import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import ActivityPlanner from './pages/ActivityPlanner'
import FoodPlanner from './pages/FoodPlanner'
import MyProfile from './pages/MyProfile';
import UserForm from './pages/UserForm';

function App() {

  return (
    <div className='bg-gray-200 h-dvh'>
      <Router>
        <div className="flex flex-row gap-2">
          <div>
            <Sidebar />
          </div>
          <div className='flex-1 h-screen pe-4'>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/activity-planner' element={<ActivityPlanner />} />
                <Route path='/food-planner' element={<FoodPlanner />} />
                <Route path='/user-form' element={<UserForm />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
};

export default App;