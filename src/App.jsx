import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ActivityPlanner from './pages/ActivityPlanner'
import MyProfile from './pages/MyProfile';

function App() {

  return (
    <div className='bg-gray-200 h-svh p-4'>
      <Router>
        <div className="flex flex-row gap-4">
          <div className='basis-1/6'>
            <Sidebar />
          </div>
          <div className='basis-5/6'>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/activity-planner' element={<ActivityPlanner />} />
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

{/* <main class="grid grid-cols-3 gap-3">
            <div><FoodPlanner /></div>
            <div><ExerciseFinder /></div>
          </main> */}