
const express = require('express');
const { 
    createExam, 
    getExams, 
    getExamById, 
    submitExam, 
    getResults,
    getAllExams
} = require('../controllers/examController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createExam);
router.get('/', protect, getExams);
router.get('/all', protect, getAllExams); 
router.get('/:id', protect, getExamById);
router.post('/submit', protect, submitExam);
router.get('/results', protect, getResults);

module.exports = router;
