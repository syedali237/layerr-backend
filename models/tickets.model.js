import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  industry: { type: String, required: true },
  companyName: { type: String, required: true },
  message: { type: String, required: true },
});

export default model('Ticket', ticketSchema);
