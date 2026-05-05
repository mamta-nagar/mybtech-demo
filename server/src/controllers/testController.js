const Test = require('../models/Test');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');

exports.createTest = async (req, res) => {
  const { title, durationMinutes = 120, questionIds } = req.body;
  if (questionIds.length !== 100) return res.status(400).json({ message: 'Test must have 100 questions.' });
  const test = await Test.create({ title, durationMinutes, questions: questionIds });
  res.json(test);
};

exports.listTests = async (_req, res) => res.json(await Test.find().select('title durationMinutes createdAt'));

exports.getTestById = async (req, res) => {
  const test = await Test.findById(req.params.id).populate('questions');
  res.json(test);
};

exports.submitAttempt = async (req, res) => {
  const { testId, answers } = req.body;
  const test = await Test.findById(testId).populate('questions');
  let score = 0, correct = 0, incorrect = 0, skipped = 0;
  const detailed = test.questions.map((q) => {
    const ans = answers.find((a) => a.question === String(q._id));
    if (!ans || ans.selectedOptionIndex === null || ans.selectedOptionIndex === undefined) { skipped++; return { question: q, status: 'skipped' }; }
    if (ans.selectedOptionIndex === q.correctOptionIndex) { score += 1; correct++; return { question: q, status: 'correct' }; }
    score -= 1 / 3; incorrect++; return { question: q, status: 'incorrect' };
  });
  const accuracy = test.questions.length ? (correct / test.questions.length) * 100 : 0;
  const attempt = await Attempt.create({ user: req.user.id, test: testId, answers, score, correct, incorrect, skipped, accuracy });
  res.json({ attemptId: attempt._id, score, correct, incorrect, skipped, accuracy, detailed });
};

exports.myAttempts = async (req, res) => {
  const attempts = await Attempt.find({ user: req.user.id }).populate('test', 'title').sort({ submittedAt: -1 });
  res.json(attempts);
};

exports.analytics = async (req, res) => {
  const attempts = await Attempt.find({ user: req.user.id }).populate({ path: 'answers.question', select: 'subject' });
  const topic = {};
  attempts.forEach(a => a.answers.forEach(ans => {
    const subject = ans.question?.subject || 'Unknown';
    if (!topic[subject]) topic[subject] = { attempted: 0, spent: 0 };
    if (ans.selectedOptionIndex !== null && ans.selectedOptionIndex !== undefined) topic[subject].attempted++;
    topic[subject].spent += ans.timeSpentSec || 0;
  }));
  res.json({
    averageAccuracy: attempts.length ? attempts.reduce((s, a) => s + a.accuracy, 0) / attempts.length : 0,
    progress: attempts.map(a => ({ date: a.submittedAt, score: a.score, accuracy: a.accuracy })),
    topic
  });
};
