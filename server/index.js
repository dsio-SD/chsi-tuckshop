require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/auth');
const snacksRoutes = require('./routes/snacks');
const accountRoutes = require('./routes/account');

const sessionConfig = require('./session/sessionConfig');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionConfig));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(express.static('frontend'));

app.use('/auth', authRoutes);
app.use('/snacks', snacksRoutes);
app.use('/account', accountRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
