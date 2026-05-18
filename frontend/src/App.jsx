import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EmployeeRegistrationForm from './components/EmployeeRegistrationForm';
import EmployeeList from './components/EmployeeList';
import AIRecommendationDisplay from './components/AIRecommendationDisplay';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <div className="min-h-screen">
        {token && <Navbar setToken={setToken} />}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
            <Route path="/" element={token ? <EmployeeList /> : <Navigate to="/login" />} />
            <Route path="/add-employee" element={token ? <EmployeeRegistrationForm /> : <Navigate to="/login" />} />
            <Route path="/ai-recommendations" element={token ? <AIRecommendationDisplay /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
