const express = require('express');
const requireLogin = require('../utils/requireLogin');
const Snack = require('../models/Snack');
const User = require('../models/User');

const router = express.Router();

// List snacks
router.get('/', async (req, res) => {
  const snacks = await Snack.find();
  res.json(snacks);
});

// Purchase snack
router.post('/purchase', requireLogin, async (req, res) => {
  const { snackId } = req.body;
  const snack = await Snack.findById(snackId);
  if (!snack) return res.status(404).json({ error: 'Snack not found' });

  const user = await User.findById(req.session.userId);
  if (user.balance < snack.price) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  user.balance -= snack.price;
  await user.save();

  res.json({ message: `Purchased ${snack.name}`, newBalance: user.balance });
});

// Add snack (admin only)
router.post('/add', requireLogin, async (req, res) => {
  if (req.session.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only' });
  }

  const { name, price } = req.body;
  const newSnack = new Snack({ name, price });
  await newSnack.save();

  res.json({ message: 'Snack added' });
});

module.exports = router;
