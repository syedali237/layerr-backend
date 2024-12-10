import 'dotenv/config'
import express, { json } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import ticketRoutes  from "./routes/tickets.js";
import subscriptionRoutes  from "./routes/subscription.js";

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Database Connection
const startServer = async () => {
    try {
      // Replace with your MongoDB connection string in the `.env` file
      const mongoURI = process.env.MONGO_URI;
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
  
      // Start the server
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  };
  
  // Start the server
  startServer();
