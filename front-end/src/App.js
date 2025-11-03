import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './pages/TransactionHistory';
import Developer from './pages/Developer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('billBuddyUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('billBuddyUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('billBuddyUser');
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <SignIn onLogin={handleLogin} />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp onLogin={handleLogin} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
            <Route path="/transactions/:contactId" element={user ? <TransactionHistory user={user} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
            <Route path="/developer" element={<Developer />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;