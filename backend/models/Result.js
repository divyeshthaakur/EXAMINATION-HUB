const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam', 
        required: true
    },
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    autoSubmitted: { type: Boolean, default: false },
    tabSwitches: { type: Number, default: 0 },
    duration: { type: Number, default: 0 }, // Duration in seconds
    completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);