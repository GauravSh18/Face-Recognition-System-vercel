import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, faceDescriptor } = req.body;
    const user = new User({ name, email, faceDescriptor });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { faceDescriptor } = req.body;
    const users = await User.find();
    
    const matchedUser = users.find(user => {
      const distance = euclideanDistance(user.faceDescriptor, faceDescriptor);
      return distance < 0.6; // Adjust this threshold as needed
    });

    if (matchedUser) {
      res.json({ message: 'Login successful', user: { name: matchedUser.name, email: matchedUser.email } });
    } else {
      res.status(401).json({ message: 'User not recognized' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

function euclideanDistance(a, b) {
  return Math.sqrt(a.map((x, i) => Math.pow(x - b[i], 2)).reduce((sum, now) => sum + now));
}

export default router;

