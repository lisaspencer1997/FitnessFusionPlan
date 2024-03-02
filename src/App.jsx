import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Header from './components/Header';
import FoodPlanner from './components/FoodPlanner';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div>
      <Router>
        <Header />
        <Sidebar />
        <FoodPlanner />
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
