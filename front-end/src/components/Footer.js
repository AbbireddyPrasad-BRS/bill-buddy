import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-auto">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Typography variant="h6" className="mb-4 font-bold">
              Bill Buddy
            </Typography>
            <Typography variant="body2" className="text-gray-300 dark:text-gray-400">
              Track your personal financial transactions with friends and contacts easily and efficiently.
            </Typography>
          </div>
          
          <div>
            <Typography variant="h6" className="mb-4 font-bold">
              Features
            </Typography>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>• Contact Management</li>
              <li>• Transaction Tracking</li>
              <li>• Real-time Balance</li>
              <li>• Mobile Responsive</li>
            </ul>
          </div>
          
          <div>
            <Typography variant="h6" className="mb-4 font-bold">
              Contact
            </Typography>
            <Typography variant="body2" className="text-gray-300 dark:text-gray-400">
              Built with ❤️ for better financial tracking
            </Typography>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-4 text-center">
          <Typography variant="body2" className="text-gray-400 dark:text-gray-500">
            © 2025 Bill Buddy. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
