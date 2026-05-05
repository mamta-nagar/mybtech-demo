require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

connectDB().then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')));
