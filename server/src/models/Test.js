const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: String,
  durationMinutes: { type: Number, default: 120 },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', testSchema);
