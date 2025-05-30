import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, BookOpen, Clock, AlertCircle } from 'lucide-react';

const CreateExam = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
    };

    const removeQuestion = (index) => {
        if (questions.length > 1) {
            const newQuestions = [...questions];
            newQuestions.splice(index, 1);
            setQuestions(newQuestions);
        }
    };

    const handleChangeQuestion = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleChangeOption = (index, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleChangeAnswer = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post('https://examination-hub.onrender.com/api/exams', { title, questions }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess(true);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create exam. Please try again.');
            setIsSubmitting(false);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <BookOpen className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Create New Exam</h1>
                            <p className="text-gray-600">Design your exam with multiple choice questions</p>
                        </div>
                    </div>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3"
                    >
                        <AlertCircle className="text-red-500 mt-0.5" size={20} />
                        <p className="text-red-700">{error}</p>
                    </motion.div>
                )}

                {success && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start gap-3"
                    >
                        <div className="bg-green-100 p-1 rounded-full">
                            <Save className="text-green-600" size={16} />
                        </div>
                        <p className="text-green-700">Exam created successfully! Redirecting to dashboard...</p>
                    </motion.div>
                )}

                <motion.form 
                    onSubmit={handleSubmit} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Exam Details</h2>
                    </div>
                    
                    <div className="p-6">
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Exam Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter a descriptive title for your exam"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div className="space-y-6">
                            {questions.map((q, index) => (
                                <motion.div
                                    key={index} 
                                    variants={item}
                                    className="bg-gray-50 p-6 rounded-lg border border-gray-100 relative"
                                >
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                                        {questions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeQuestion(index)}
                                                className="p-1 text-gray-400 hover:text-red-500 transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Question Text
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your question"
                                            value={q.question}
                                            onChange={(e) => handleChangeQuestion(index, e.target.value)}
                                            className="w-full px-4 py-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Options
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {q.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder={`Option ${optionIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) => handleChangeOption(index, optionIndex, e.target.value)}
                                                        className="w-full px-4 py-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                        required
                                                    />
                                                    {option === q.answer && (
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <div className="bg-green-100 text-green-600 p-1 rounded-full">
                                                                <Save size={14} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Correct Answer
                                        </label>
                                        <select
                                            value={q.answer}
                                            onChange={(e) => handleChangeAnswer(index, e.target.value)}
                                            className="w-full px-4 py-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            required
                                        >
                                            <option value="">Select the correct answer</option>
                                            {q.options.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option}>
                                                    {option || `Option ${optionIndex + 1}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-100 transition"
                            >
                                <Plus size={18} />
                                Add Another Question
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Exam...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Create Exam
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default CreateExam;