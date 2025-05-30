/* eslint-disable no-unused-vars */
// src/components/Results.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Download, Award, CheckCircle, XCircle, FileText, Clock, BarChart2, Trophy, Calendar, BookOpen } from 'lucide-react';

const Results = () => {
    const [results, setResults] = useState([]);
    const [exams, setExams] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                
                // Fetch results
                const resultsResponse = await axios.get('https://examination-hub.onrender.com/api/results', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // Filter out results with null exam data
                const validResults = resultsResponse.data.filter(result => result && result.exam);
                
                if (validResults.length !== resultsResponse.data.length) {
                    console.warn('Some results had missing exam data and were filtered out');
                }
                
                setResults(validResults);
                setLoading(false);
            } catch (err) {
                setError('Failed to load your results. Please try again later.');
                setLoading(false);
                console.error('Error fetching results:', err);
            }
        };
        
        fetchData();
    }, []);

    const calculatePercentage = (result) => {
        if (!result || !result.exam || !result.exam.questions) {
            return 0;
        }
        
        const totalQuestions = result.exam.questions.length;
        if (totalQuestions === 0) return 0;
        
        return Math.round((result.score / totalQuestions) * 100);
    };

    const getExamTitle = (result) => {
        if (!result || !result.exam) {
            return "Unknown Exam";
        }
        return result.exam.title || "Untitled Exam";
    };

    const getQuestionCount = (result) => {
        if (!result || !result.exam || !result.exam.questions) {
            return 0;
        }
        return result.exam.questions.length;
    };

    const downloadCertificate = (resultId) => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios({
            url: `https://examination-hub.onrender.com/api/results/certificate/${resultId}`,
            method: 'GET',
            responseType: 'blob',
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `certificate-${resultId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            setError('Error downloading certificate. Please try again later.');
            console.error('Error downloading certificate:', error);
        });
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

    if (loading && results.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your results...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm">
                    <div className="text-red-500 mb-4">
                        <XCircle size={48} className="mx-auto" />
                    </div>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-blue-800 flex items-center">
                                <Trophy size={32} className="mr-3 text-blue-600" />
                                Exam Results
                            </h1>
                            <p className="mt-2 text-gray-600">
                                View your performance and download certificates
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-50 p-2 rounded-full">
                                    <BookOpen size={20} className="text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Exams</p>
                                    <p className="text-xl font-bold text-blue-700">{results.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results Section */}
                {results.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm p-8 text-center"
                    >
                        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="text-blue-500" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Yet</h3>
                        <p className="text-gray-600 mb-8">You haven't taken any exams yet.</p>
                        <button 
                            onClick={() => window.location.href = '/dashboard'} 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                        >
                            Browse Available Exams
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Stats Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">Performance Summary</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle size={20} className="text-green-500" />
                                            <p className="text-sm font-medium text-gray-700">Passed</p>
                                        </div>
                                        <p className="text-2xl font-bold text-green-600">
                                            {results.filter(r => r.passed).length}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <XCircle size={20} className="text-red-500" />
                                            <p className="text-sm font-medium text-gray-700">Failed</p>
                                        </div>
                                        <p className="text-2xl font-bold text-red-600">
                                            {results.filter(r => !r.passed).length}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-medium text-gray-700">Average Score</p>
                                        <p className="text-sm font-medium text-blue-600">
                                            {Math.round(results.reduce((acc, r) => acc + calculatePercentage(r), 0) / results.length)}%
                                        </p>
                                    </div>
                                    <div className="w-full bg-blue-100 rounded-full h-2.5">
                                        <div 
                                            className="bg-blue-600 h-2.5 rounded-full" 
                                            style={{ 
                                                width: `${Math.round(results.reduce((acc, r) => acc + calculatePercentage(r), 0) / results.length)}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Activity Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-4">
                                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {results.slice(0, 3).map((result, index) => (
                                        <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className={`p-2 rounded-full ${result.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                                                {result.passed ? (
                                                    <CheckCircle size={16} className="text-green-500" />
                                                ) : (
                                                    <XCircle size={16} className="text-red-500" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{getExamTitle(result)}</p>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <Calendar size={14} className="mr-1" />
                                                        <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BarChart2 size={14} className="mr-1" />
                                                        <span>{calculatePercentage(result)}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Results List */}
                {results.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-8"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-4">All Results</h2>
                        <motion.div 
                            className="space-y-4"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            {results.map(result => {
                                const percentage = calculatePercentage(result);
                                const totalQuestions = getQuestionCount(result);
                                
                                return (
                                    <motion.div 
                                        key={result._id} 
                                        variants={item}
                                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                                    >
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-lg ${result.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                                                        {result.passed ? (
                                                            <CheckCircle className="text-green-500" size={24} />
                                                        ) : (
                                                            <XCircle className="text-red-500" size={24} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-800">{getExamTitle(result)}</h3>
                                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                            <div className="flex items-center">
                                                                <Calendar size={16} className="mr-1" />
                                                                <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <BarChart2 size={16} className="mr-1" />
                                                                <span>{totalQuestions} Questions</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className={`text-3xl font-bold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                                        {percentage}%
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Score: {result.score}/{totalQuestions}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                                            <button
                                                onClick={() => downloadCertificate(result._id)}
                                                className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex items-center justify-center gap-2"
                                            >
                                                <Download size={18} />
                                                Download Certificate
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Results;