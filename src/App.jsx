import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FoodPlannerCalendar from './pages/FoodPlannerCalendar';
import TrainingCalendar from './pages/TrainingCalendar';

function App() {

  return (
    <div>
      <Router>
        <Header />
        <Sidebar />
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='TrainingCalendar' element={<TrainingCalendar />} />
            <Route path='FoodPlannerCalendar' element={<FoodPlannerCalendar />} />
            <Route path='Settings' element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
};

export default App;
