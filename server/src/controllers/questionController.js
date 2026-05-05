const Question = require('../models/Question');
const { generateQuestions } = require('../services/aiQuestionService');

exports.createQuestion = async (req, res) => res.json(await Question.create(req.body));
exports.listQuestions = async (req, res) => res.json(await Question.find(req.query.subject ? { subject: req.query.subject } : {}));
exports.importQuestions = async (req, res) => res.json(await Question.insertMany(req.body.questions));
exports.exportQuestions = async (_req, res) => res.json(await Question.find());
exports.aiGenerate = async (req, res) => res.json(await Question.insertMany(generateQuestions(req.body)));
