import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default model('Subscription', subscriptionSchema);
