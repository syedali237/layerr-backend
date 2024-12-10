import { Router } from 'express';
import User from '../models/user.model.js';
import pkg from 'jsonwebtoken'; // Import CommonJS module as default
const { sign } = pkg;

const router = Router();
const { JWT_SECRET } = process.env;

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ "User Registered Successfully": user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ "User Logged in" : user});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
