import React from 'react';
import { Container, Typography, Button, Chip } from '@mui/material';
import { GitHub, Language, Email, Code, Star } from '@mui/icons-material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Developer = () => {
  const techStack = [
    { name: 'React.js', color: 'bg-blue-500' },
    { name: 'Node.js', color: 'bg-green-500' },
    { name: 'Express.js', color: 'bg-gray-600' },
    { name: 'MongoDB', color: 'bg-green-600' },
    { name: 'Material-UI', color: 'bg-blue-600' },
    { name: 'Tailwind CSS', color: 'bg-cyan-500' }
  ];

  const features = [
    { icon: '🔐', text: 'User authentication with secure login/signup' },
    { icon: '👥', text: 'Contact management with CRUD operations' },
    { icon: '💰', text: 'Transaction tracking with real-time balance calculation' },
    { icon: '📱', text: 'Responsive design for mobile and desktop' },
    { icon: '🎨', text: 'Interactive UI with Material-UI and Tailwind CSS' },
    { icon: '🚀', text: 'RESTful API design with Express.js and MongoDB' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
      <Header showAuthButtons={true} position="static" />
      
      <Container maxWidth="xl" className="py-12">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[85vh]">
          {/* Left Side - Photo and Personal Info (1/4 of window) */}
          <div className="lg:w-1/4 flex flex-col items-center space-y-8">
            {/* Large Developer Photo - Top Left */}
            <div className="relative group w-full">
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              <img
                src="/dev-photo.jpg"
                alt="Developer Photo"
                className="relative w-full aspect-square max-w-sm rounded-full object-cover border-8 border-white shadow-2xl transform group-hover:scale-110 transition-all duration-500"
              />
            </div>

            {/* Name and Contact Info - Bottom Left */}
            <div className="text-center space-y-6 w-full">
              <div className="space-y-3">
                <Typography variant="h4" className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
                  Abbireddy V.V.S.S.Prasad
                </Typography>
                <Typography variant="h6" className="text-gray-700 font-medium">
                  🚀 Full Stack Developer
                </Typography>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col gap-3 w-full">
                <Button
                  variant="contained"
                  startIcon={<GitHub />}
                  href="https://github.com/AbbireddyPrasad-BRS"
                  target="_blank"
                  className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl w-full"
                >
                  GitHub
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Language />}
                  href="https://abbireddy-portfolio.netlify.app"
                  target="_blank"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl w-full"
                >
                  Portfolio
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  href="mailto:abbireddysaiprasad@gmail.com"
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl w-full"
                >
                  Email Me
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Project Info and Tech Stack (3/4 of window) */}
          <div className="lg:w-3/4 space-y-8">
            {/* About Project */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <Code className="text-4xl text-blue-600 mr-4" />
                <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
                  About This Project
                </Typography>
              </div>
              <Typography variant="body1" className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                💰 <strong>Bill Buddy</strong> is a comprehensive MERN stack application designed to help users track their personal 
                financial transactions with friends and contacts. The application provides an intuitive interface 
                for managing contacts, recording transactions, and maintaining real-time balance calculations.
              </Typography>
              <Typography variant="body1" className="text-gray-700 dark:text-gray-300 leading-relaxed">
                🎯 As the developer of this project, I've implemented modern web development practices including 
                responsive design, real-time data updates, and user-friendly interfaces to create a seamless 
                experience for managing personal finances.
              </Typography>
            </div>

            {/* Tech Stack */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <Star className="text-4xl text-yellow-500 mr-4" />
                <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">
                  Tech Stack Used
                </Typography>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className={`${tech.color} text-white px-4 py-3 rounded-xl font-semibold text-center transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer`}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <Typography variant="h4" className="font-bold text-gray-800 dark:text-white mb-6">
                🌟 Key Features Implemented
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <span className="text-2xl mr-3">{feature.icon}</span>
                    <Typography variant="body2" className="text-gray-700 dark:text-gray-200 font-medium">
                      {feature.text}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      
      <Footer />
    </div>
  );
};

export default Developer;