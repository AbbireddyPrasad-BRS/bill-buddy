import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock, CheckCircle } from '@mui/icons-material';
import { auth } from '../utils/api';
import Header from '../components/Header';

const SignUp = ({ onLogin }) => {
  const [formData, setFormData] = useState({ userid: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password') {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 6) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await auth.register({ userid: formData.userid, password: formData.password });
      const loginResponse = await auth.login({ userid: formData.userid, password: formData.password });
      onLogin(loginResponse.data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      <Header showAuthButtons={false} />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <Container maxWidth="sm" className="relative z-10 py-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-bounce">
            <span className="text-4xl">🚀</span>
          </div>
          <Typography variant="h3" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
            Join Bill Buddy
          </Typography>
          <Typography variant="h6" className="text-gray-600 dark:text-gray-300">
            Start managing your finances today!
          </Typography>
        </div>
        
        <Paper 
          elevation={20} 
          className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-500 shadow-2xl"
        >
          {error && (
            <Alert 
              severity="error" 
              className="mb-6 rounded-xl bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-400 text-red-800 dark:text-red-200"
              sx={{
                '& .MuiAlert-message': {
                  color: 'rgb(153, 27, 27)',
                  '.dark &': {
                    color: 'rgb(254, 202, 202)',
                  },
                },
                '& .MuiAlert-icon': {
                  color: 'rgb(153, 27, 27)',
                  '.dark &': {
                    color: 'rgb(254, 202, 202)',
                  },
                },
              }}
            >
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="User ID"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              required
              variant="outlined"
              helperText="Choose a unique user ID"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="text-blue-500" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgb(75, 85, 99)',
                  '.dark &': {
                    color: 'rgb(59, 130, 246)',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: 'rgb(107, 114, 128)',
                },
              }}
              className="transform hover:scale-105 transition-transform duration-200"
            />
            
            <div>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className="text-blue-500" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        className="hover:scale-110 transition-transform"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgb(75, 85, 99)',
                    '.dark &': {
                      color: 'rgb(59, 130, 246)',
                    },
                  },
                }}
                className="transform hover:scale-105 transition-transform duration-200"
              />
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          passwordStrength >= level
                            ? passwordStrength === 1
                              ? 'bg-red-400'
                              : passwordStrength === 2
                              ? 'bg-yellow-400'
                              : passwordStrength === 3
                              ? 'bg-blue-400'
                              : 'bg-green-400'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
                    Password strength: {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'Very Weak'}
                  </Typography>
                </div>
              )}
            </div>
            
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              variant="outlined"
              error={formData.confirmPassword && formData.password !== formData.confirmPassword}
              helperText={
                formData.confirmPassword && formData.password !== formData.confirmPassword
                  ? 'Passwords do not match'
                  : formData.confirmPassword && formData.password === formData.confirmPassword
                  ? '✅ Passwords match!'
                  : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CheckCircle className={`${
                      formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }`} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      className="hover:scale-110 transition-transform"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgb(75, 85, 99)',
                  '.dark &': {
                    color: 'rgb(59, 130, 246)',
                  },
                },
                '& .MuiFormHelperText-root': {
                  color: formData.confirmPassword && formData.password === formData.confirmPassword
                    ? 'rgb(34, 197, 94)'
                    : 'rgb(239, 68, 68)',
                },
              }}
              className="transform hover:scale-105 transition-transform duration-200"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || formData.password !== formData.confirmPassword}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-4 text-lg font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>🚀</span>
                  Create Account
                </div>
              )}
            </Button>
          </form>
          
          <div className="text-center mt-8">
            <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Link 
                to="/signin" 
                className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold hover:underline transition-colors duration-200"
              >
                Sign In Here 👈
              </Link>
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUp;