const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  balance: { type: Number, default: 0 },
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
});

module.exports = mongoose.model('User', userSchema);
