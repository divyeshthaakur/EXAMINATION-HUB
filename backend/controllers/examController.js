const Exam = require('../models/Exam');
const Result = require('../models/Result');
const mongoose = require('mongoose');

exports.createExam = async (req, res) => {
    const exam = new Exam({ 
        ...req.body, 
        createdBy: req.user.id,
        status: 'active' // Set default status to active
    });
    try {
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExams = async (req, res) => {
    try {
        if (req.user.role === 'examiner') {
            const exams = await Exam.find({ createdBy: req.user.id });
            return res.json(exams);
        } else {
            const completedExams = await Result.find({ user: req.user.id })
                .select('exam')
                .lean();
                
            const completedExamIds = completedExams.map(result => result.exam);
            
            const availableExams = await Exam.find({
                _id: { $nin: completedExamIds },
                status: 'active' // Only show active exams to students
            });
            
            return res.json(availableExams);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        
        
        if (req.user.role === 'student') {
            const alreadyTaken = await Result.findOne({
                user: req.user.id,
                exam: req.params.id
            });
            
            if (alreadyTaken) {
                return res.status(403).json({ 
                    message: 'You have already completed this exam',
                    result: alreadyTaken
                });
            }
        }
        
        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitExam = async (req, res) => {
    try {
        const { examId, answers, autoSubmitted, tabSwitches, duration } = req.body;
        
        // Check if user has already submitted this exam
        const existingResult = await Result.findOne({
            user: req.user.id,
            exam: examId
        });
        
        if (existingResult) {
            return res.status(400).json({ 
                message: 'You have already submitted this exam',
                result: existingResult
            });
        }
        
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        
        let score = 0;
        exam.questions.forEach((question, index) => {
            // Compare the selected answer with the correct answer
            if (answers[index] && question.answer === answers[index]) {
                score++;
            }
        });
        
        const passed = score >= (exam.questions.length / 2); 
        const result = new Result({ 
            user: req.user.id, 
            exam: examId, 
            score, 
            passed,
            autoSubmitted: autoSubmitted || false,
            tabSwitches: tabSwitches || 0,
            duration: duration || 0,
            completedAt: new Date()
        });
        
        await result.save();
        res.json({ score, passed, autoSubmitted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getResults = async (req, res) => {
    try {
        const results = await Result.find({ user: req.user.id })
            .populate('exam')
            .sort({ completedAt: -1 }); 
            
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllExams = async (req, res) => {
    try {
        if (req.user.role !== 'examiner') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        const exams = await Exam.find({});
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleExamStatus = async (req, res) => {
    try {
        if (req.user.role !== 'examiner') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        if (exam.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to modify this exam' });
        }

        exam.status = exam.status === 'active' ? 'inactive' : 'active';
        await exam.save();

        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};