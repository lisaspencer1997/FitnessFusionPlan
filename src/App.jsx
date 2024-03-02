import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FoodPlanner from './components/FoodPlanner';
import ExerciseFinder from './components/ExerciseFinder';

function App() {

  return (
    <div>
      <Router>
        <Header />
        <Sidebar />
        <FoodPlanner />
        <ExerciseFinder />
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='settings' element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
};

export default App;
