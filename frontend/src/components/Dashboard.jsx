/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Award, Clock, Users, BarChart } from 'lucide-react';

const Dashboard = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const role = localStorage.getItem('role');
    
    useEffect(() => {
        const fetchExams = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/exams', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExams(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching exams', error);
                setError('Failed to load exams. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchExams();
    }, []);
    
    const getMessageForEmptyExams = () => {
        if (role === 'examiner') {
            return "You haven't created any exams yet.";
        } else {
            return "You've completed all available exams! Check your results page to see how you did.";
        }
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-800 flex items-center">
                                <BookOpen size={32} className="mr-3 text-blue-600" />
                                {role === 'examiner' ? 'Your Created Exams' : 'Available Exams'}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {role === 'examiner' 
                                    ? 'Manage and track your examination content'
                                    : 'Browse and take available examinations'}
                            </p>
                        </div>
                        
                        {role === 'examiner' && (
                            <Link to="/create-exam">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                                >
                                    <Plus size={20} />
                                    Create New Exam
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <BookOpen className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-gray-600">Total Exams</p>
                                <h3 className="text-2xl font-bold text-blue-800">{exams.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Clock className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-gray-600">Active Exams</p>
                                <h3 className="text-2xl font-bold text-blue-800">{exams.filter(exam => exam.status === 'active').length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Users className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-gray-600">Total Participants</p>
                                <h3 className="text-2xl font-bold text-blue-800">{exams.reduce((acc, exam) => acc + (exam.participants || 0), 0)}</h3>
                            </div>
                        </div>
                    </div>
                </motion.div>
            
                {loading ? (
                    <div className="flex justify-center p-12">
                        <motion.div
                            animate={{ 
                                rotate: 360,
                            }}
                            transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
                        />
                    </div>
                ) : error ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm"
                    >
                        <p className="flex items-center gap-2">
                            <BarChart size={20} />
                            {error}
                        </p>
                    </motion.div>
                ) : exams.length > 0 ? (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {exams.map((exam) => (
                            <motion.div 
                                key={exam._id} 
                                variants={itemVariants}
                                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
                                className="bg-white border border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h2 className="font-semibold text-xl text-blue-800">{exam.title}</h2>
                                    <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600">
                                        {exam.status || 'Active'}
                                    </span>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-600">
                                        <BookOpen size={16} className="mr-2 text-blue-500" />
                                        <p>{exam.questions?.length || 0} Questions</p>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock size={16} className="mr-2 text-blue-500" />
                                        <p>{exam.duration || 60} Minutes</p>
                                    </div>
                                </div>
                                
                                <Link to={`/exam/${exam._id}`}>
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white p-3 rounded-lg shadow transition flex items-center justify-center gap-2"
                                    >
                                        {role === 'examiner' ? 'View Exam' : 'Take Exam'}
                                    </motion.button>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-12 bg-white rounded-xl border border-blue-100 shadow-sm"
                    >
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award size={32} className="text-blue-500" />
                        </div>
                        <p className="text-blue-800 mb-6 text-lg">{getMessageForEmptyExams()}</p>
                        
                        {role === 'examiner' ? (
                            <Link to="/create-exam">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg shadow transition"
                                >
                                    Create Your First Exam
                                </motion.button>
                            </Link>
                        ) : (
                            <Link to="/results">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg shadow transition"
                                >
                                    View Your Results
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;