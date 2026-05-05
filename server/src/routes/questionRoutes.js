const router = require('express').Router();
const c = require('../controllers/questionController');
const auth = require('../middleware/auth');
router.get('/', auth, c.listQuestions);
router.post('/', auth, c.createQuestion);
router.post('/import', auth, c.importQuestions);
router.get('/export', auth, c.exportQuestions);
router.post('/ai-generate', auth, c.aiGenerate);
module.exports = router;
