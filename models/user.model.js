import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return compare(candidatePassword, this.password);
};

export default model('User', userSchema);
