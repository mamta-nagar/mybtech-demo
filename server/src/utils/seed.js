require('dotenv').config({ path: '.env' });
const connectDB = require('../config/db');
const Question = require('../models/Question');

const subjects = ['General Ability', 'Current Affairs', 'Reasoning', 'Quantitative Aptitude'];

(async () => {
  await connectDB();
  await Question.deleteMany({});
  const data = Array.from({ length: 100 }).map((_, i) => ({
    subject: subjects[i % 4],
    questionText: `CAPF Mock Question ${i + 1}`,
    options: ['A', 'B', 'C', 'D'],
    correctOptionIndex: i % 4,
    solution: `Explanation for question ${i + 1}`,
    source: 'seed'
  }));
  await Question.insertMany(data);
  console.log('Seeded 100 questions');
  process.exit(0);
})();
