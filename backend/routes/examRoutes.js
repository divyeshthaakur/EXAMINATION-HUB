const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const auth = require('../middleware/auth');

router.post('/', auth, examController.createExam);
router.get('/', auth, examController.getExams);
router.get('/:id', auth, examController.getExam);
router.post('/:id/submit', auth, examController.submitExam);
router.get('/results', auth, examController.getResults);
router.patch('/:id/status', auth, examController.toggleExamStatus);

module.exports = router; 