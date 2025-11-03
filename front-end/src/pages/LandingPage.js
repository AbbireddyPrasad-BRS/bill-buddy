import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import { AccountBalance, People, Timeline, Security, TrendingUp, Notifications, CloudSync, Analytics, MobileFriendly, Lock, Speed, Update } from '@mui/icons-material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Simulate visit counter (in real app, this would be from backend)
    const count = localStorage.getItem('visitCount') || 0;
    const newCount = parseInt(count) + 1;
    localStorage.setItem('visitCount', newCount);
    setVisitCount(newCount);
  }, []);

  const currentFeatures = [
    {
      icon: <People className="text-5xl text-blue-600" />,
      title: 'Smart Contact Management',
      description: 'Add unlimited contacts with names and mobile numbers. Organize your financial relationships effortlessly.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <AccountBalance className="text-5xl text-green-600" />,
      title: 'Advanced Transaction Tracking',
      description: 'Record detailed transactions with dates, amounts, descriptions, and operation types (giving/receiving money).',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Timeline className="text-5xl text-purple-600" />,
      title: 'Real-time Balance Calculation',
      description: 'Automatic balance updates with color-coded indicators. Know instantly who owes whom and how much.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Security className="text-5xl text-red-600" />,
      title: 'Secure & Private Data',
      description: 'Your financial data is encrypted and stored securely. Complete privacy with user authentication.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: <MobileFriendly className="text-5xl text-indigo-600" />,
      title: 'Mobile-First Design',
      description: 'Responsive design optimized for mobile devices. Access your financial data anywhere, anytime.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <Speed className="text-5xl text-yellow-600" />,
      title: 'Lightning Fast Performance',
      description: 'Built with modern MERN stack for optimal performance. Real-time updates and smooth user experience.',
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  const futureUpdates = [
    {
      icon: <Notifications className="text-4xl text-blue-500" />,
      title: 'Smart Notifications',
      description: 'Get reminders for pending payments and transaction alerts',
      status: 'Coming Soon'
    },
    {
      icon: <CloudSync className="text-4xl text-green-500" />,
      title: 'Cloud Backup & Sync',
      description: 'Automatic data backup and sync across multiple devices',
      status: 'In Development'
    },
    {
      icon: <Analytics className="text-4xl text-purple-500" />,
      title: 'Advanced Analytics',
      description: 'Detailed spending patterns and financial insights with charts',
      status: 'Planned'
    },
    {
      icon: <TrendingUp className="text-4xl text-orange-500" />,
      title: 'Expense Categories',
      description: 'Categorize transactions for better financial management',
      status: 'Planned'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      <Header showAuthButtons={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <Container maxWidth="lg" className="relative z-10">
          <div className="text-center">
            <Typography variant="h1" className="font-bold mb-6 animate-fade-in text-4xl md:text-7xl text-white">
              <span className="text-yellow-400">💰</span> Bill Buddy
            </Typography>
            <Typography variant="h4" className="mb-8 opacity-95 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-center">
              🚀 The Ultimate Personal Finance Tracker for Managing Money with Friends & Contacts
            </Typography>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signup"
                className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 text-xl font-bold rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white"
              >
                ✨ Start Free Today
              </Button>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signin"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-10 py-4 text-xl font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 border-2 border-yellow-300 animate-pulse"
              >
                🔐 Sign In
              </Button>
            </div>
            <div className="bg-gradient-to-r from-white/20 to-blue-100/20 backdrop-blur-sm inline-block px-8 py-4 rounded-full border border-white/30">
              <Typography variant="h6" className="opacity-95 flex items-center gap-2">
                <span className="text-2xl">👥</span> 
                <span className="font-bold text-yellow-300">{visitCount.toLocaleString()}</span> 
                <span>Users Joined Our Community!</span>
              </Typography>
            </div>
          </div>
        </Container>
      </section>

      {/* Current Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <Container maxWidth="xl">
          <div className="text-center mb-16">
            <Typography variant="h2" className="font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent text-center">
              🌟 Current Features
            </Typography>
            <Typography variant="h5" className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center">
              Powerful tools to manage your personal finances with friends and contacts
            </Typography>
          </div>
          <Grid container spacing={4}>
            {currentFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card className={`h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br ${feature.color} text-white border-0 overflow-hidden relative`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <Typography variant="h5" className="font-bold mb-4 text-white">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" className="text-white/90 leading-relaxed">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-slate-800">
        <Container maxWidth="lg">
          <Typography variant="h2" className="text-center font-bold mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            🎯 How It Works
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up with your unique user ID and secure password', icon: '🔐', color: 'from-blue-500 to-cyan-500' },
              { step: '2', title: 'Add Contacts', desc: 'Add friends and contacts you exchange money with', icon: '👥', color: 'from-green-500 to-emerald-500' },
              { step: '3', title: 'Track Transactions', desc: 'Record money given and received with detailed descriptions', icon: '💰', color: 'from-purple-500 to-pink-500' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-r ${item.color} text-white rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 text-4xl font-bold shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  {item.icon}
                </div>
                <Typography variant="h4" className="font-bold mb-4 text-gray-800 dark:text-white text-center">
                  {item.title}
                </Typography>
                <Typography variant="body1" className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-center">
                  {item.desc}
                </Typography>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Future Updates Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <Typography variant="h2" className="font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-center">
              🚀 Future Updates
            </Typography>
            <Typography variant="h5" className="text-gray-300 max-w-3xl mx-auto text-center">
              Exciting features coming soon to make your financial management even better
            </Typography>
          </div>
          <Grid container spacing={4}>
            {futureUpdates.map((update, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="transform hover:scale-110 transition-transform duration-300">
                        {update.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Typography variant="h5" className="font-bold text-white">
                            {update.title}
                          </Typography>
                          <Chip 
                            label={update.status} 
                            size="small" 
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold"
                          />
                        </div>
                        <Typography variant="body1" className="text-gray-300 leading-relaxed">
                          {update.description}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;