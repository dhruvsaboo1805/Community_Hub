const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Transaction = require('../models/Transaction');

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Step 1: User Registration (Sign-Up)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      totalCredits: 0, 
      savedFeeds: [],
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Return token with user data
    res.status(201).json({
      message: 'User created successfully',
      token,
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Step 2: User Login (Authenticate & Generate JWT)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Fetch user profile data (including saved feeds and credit info)
    const userProfile = {
      name: user.name,
      email: user.email,
      totalCredits: user.totalCredits,
      savedFeeds: user.savedFeeds,
    };

    // Return token with user profile
    res.status(200).json({
      message: 'Login successful',
      token,
      userProfile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Step 3: Fetch User Profile (After Login)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).populate('savedFeeds').exec();

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Prepare profile data
    const userProfile = {
      name: user.name,
      email: user.email,
      totalCredits: user.totalCredits,
      savedFeeds: user.savedFeeds,
    };

    res.status(200).json({ userProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
