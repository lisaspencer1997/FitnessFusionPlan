import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ActivityPlanner from './pages/ActivityPlanner'
import FoodPlanner from './pages/FoodPlanner'
import MyProfile from './pages/MyProfile';
import Header from './components/Header';

function App() {

  return (
    <div>
      <Router>
        <Header />
        <div className="mx-8">
          <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/activity-planner' element={<ActivityPlanner />} />
              <Route path='/food-planner' element={<FoodPlanner />} />
              <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
};

export default App;