const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOptionIndex: Number,
    markedForReview: { type: Boolean, default: false },
    timeSpentSec: { type: Number, default: 0 }
  }],
  score: Number,
  correct: Number,
  incorrect: Number,
  skipped: Number,
  accuracy: Number,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attempt', attemptSchema);
