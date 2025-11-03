const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { userid, password } = req.body;
    
    const existingUser = await User.findOne({ userid });
    if (existingUser) {
      return res.status(400).json({ message: 'User ID already exists. Please choose a different one.' });
    }

    const user = new User({ userid, password });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User ID already exists. Please choose a different one.' });
    }
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { userid, password } = req.body;
    
    const user = await User.findOne({ userid });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    res.json({ message: 'Login successful', userId: user._id, userid: user.userid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;