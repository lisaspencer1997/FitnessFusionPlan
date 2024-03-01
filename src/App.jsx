import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {

  return (
    <div>
      <Router>
        <Header />
        <Sidebar />
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
