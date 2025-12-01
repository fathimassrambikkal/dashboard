import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyDashboard from './pages/CompanyDashboard';
import CustomerLogin from './pages/CustomerLogin';
import Sign from './pages/Sign';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </Router>
  );
}

export default App;