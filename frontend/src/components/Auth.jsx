import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, User, Lock, ArrowRight } from 'lucide-react';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const endpoint = isRegistering ? '/register' : '/login';

        try {
            const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, { username, password, role });
            
            if (isRegistering) {
                setSuccessMessage('Registration successful! You can now log in.');
            } else {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('username', response.data.username);

                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4"
        >
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
                    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-8 text-center">
                        <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full mb-4">
                            <span className="flex items-center text-sm font-medium">
                                <BookOpen size={16} className="mr-2" />
                                {isRegistering ? 'Create Account' : 'Welcome Back'}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white">
                            {isRegistering ? 'Join Examination Hub' : 'Sign In'}
                        </h2>
                    </div>

                    <div className="p-6">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 text-sm text-red-700 bg-red-50/80 rounded-lg border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}
                        {successMessage && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 text-sm text-green-700 bg-green-50/80 rounded-lg border border-green-100"
                            >
                                {successMessage}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white/50"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-blue-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white/50"
                                />
                            </div>

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white/50"
                                required
                            >
                                <option value="student">Student</option>
                                <option value="examiner">Examiner</option>
                            </select>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-200"
                            >
                                {isRegistering ? 'Create Account' : 'Sign In'}
                                <ArrowRight className="ml-2" size={18} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="w-full text-blue-500 hover:text-blue-600 font-medium transition-colors"
                            >
                                {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Auth;
