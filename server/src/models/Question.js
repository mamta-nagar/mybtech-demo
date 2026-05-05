const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    enum: ['General Ability', 'Current Affairs', 'Reasoning', 'Quantitative Aptitude'],
    required: true
  },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, min: 0, max: 3, required: true },
  solution: { type: String, required: true },
  source: { type: String, default: 'manual' }
});

module.exports = mongoose.model('Question', questionSchema);
