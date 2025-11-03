import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ user, onLogout, showAuthButtons = true, position = 'static' }) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
    handleMenuClose();
  };

  return (
    <AppBar position={position} className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-xl border-b border-white/20 z-50">
      <Toolbar className="px-4">
        <div className="flex items-center flex-1">
          <img src="/logo.jpg" alt="Logo" className="w-8 h-8 mr-2" />
          <Typography variant="h6" component={Link} to={user ? "/dashboard" : "/"} className="text-white no-underline font-bold">
            Bill Buddy
          </Typography>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-3">
          <IconButton 
            onClick={toggleTheme}
            className="text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            {isDark ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Button 
            color="inherit" 
            component={Link} 
            to="/developer"
            className="text-white hover:bg-white/20 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            👨‍💻 Developer
          </Button>
          {user ? (
            <>
              <div className="bg-gradient-to-r from-white/25 to-blue-100/25 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <Typography variant="body2" className="text-white font-bold">
                  👤 {user.userid}
                </Typography>
              </div>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                className="text-white hover:bg-red-500/20 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                🚪 Logout
              </Button>
            </>
          ) : showAuthButtons && (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signin"
                className="text-white hover:bg-white/20 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                🔑 Sign In
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signup"
                className="bg-gradient-to-r from-white/20 to-blue-100/20 text-white hover:from-white hover:to-blue-50 hover:text-blue-700 px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                ✨ Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <IconButton color="inherit" onClick={handleMobileMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { toggleTheme(); handleMenuClose(); }}>
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </MenuItem>
            <MenuItem component={Link} to="/developer" onClick={handleMenuClose}>
              Developer
            </MenuItem>
            {user ? (
              <>
                <MenuItem onClick={handleMenuClose}>
                  Welcome, {user.userid}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </>
            ) : showAuthButtons && (
              <>
                <MenuItem component={Link} to="/signin" onClick={handleMenuClose}>
                  Sign In
                </MenuItem>
                <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
                  Get Started
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;