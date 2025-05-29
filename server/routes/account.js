const express = require('express');
const requireLogin = require('../utils/requireLogin');
const User = require('../models/User');

const router = express.Router();

// Get account info
router.get('/', requireLogin, async (req, res) => {
  const user = await User.findById(req.session.userId, 'username balance role');
  res.json(user);
});

// Top up (students only)
router.post('/topup', requireLogin, async (req, res) => {
  const { amount } = req.body;
  if (req.session.role !== 'student') {
    return res.status(403).json({ error: 'Admins cannot top up' });
  }
  const user = await User.findById(req.session.userId);
  user.balance += parseInt(amount, 10);
  await user.save();
  res.json({ message: 'Top up successful', newBalance: user.balance });
});

module.exports = router;
