import { Router } from 'express';
import Ticket from "../models/tickets.model.js"
const router = Router();

// Route to create a ticket
router.post('/open-ticket', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const ticket = new Ticket({ name, email, message });
    await ticket.save();
    res.status(201).json({ message: 'Ticket submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
});

export default router;
