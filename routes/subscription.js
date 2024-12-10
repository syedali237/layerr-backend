import { Router } from 'express';
import Subscription from '../models/subscription.model.js';
const router = Router();

// Route to subscribe
router.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;

  try {
    const subscription = new Subscription({ name, email });
    await subscription.save();
    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing', error });
  }
});

export default router;
