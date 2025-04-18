import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('username');
    const username = email ? email.split('@')[0] : '';
    
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/');
    };
   
    if (!localStorage.getItem('token')) {
        return null;
    }

    const isActive = (path) => {
        return location.pathname === path ? 'text-blue-200 border-b-2 border-blue-200' : 'text-white hover:text-blue-200';
    };

    return (
        <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="ml-2 text-xl font-bold text-white">Examination Hub</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/dashboard" className={`${isActive('/dashboard')} font-medium transition duration-150 ease-in-out pb-1`}>
                            Dashboard
                        </Link>
                        
                        {role === 'examiner' && (
                            <Link to="/create-exam" className={`${isActive('/create-exam')} font-medium transition duration-150 ease-in-out pb-1`}>
                                Create Exam
                            </Link>
                        )}
                        
                        {role !== 'examiner' && (
                            <Link to="/results" className={`${isActive('/results')} font-medium transition duration-150 ease-in-out pb-1`}>
                                Results
                            </Link>
                        )}
                        
                        <div className="relative">
                            <button 
                                className="flex items-center text-white focus:outline-none"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <span className="ml-2">{username}</span>
                                <ChevronDown size={16} className="ml-1" />
                            </button>
                            
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                        <div className="font-medium">Signed in as</div>
                                        <div className="font-bold">{email}</div>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                
                {isMenuOpen && (
                    <div className="md:hidden mt-3 py-3 border-t border-blue-400">
                        <Link 
                            to="/dashboard" 
                            className="block py-2 text-white hover:bg-blue-600 px-3 rounded"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        
                        {role === 'examiner' && (
                            <Link 
                                to="/create-exam" 
                                className="block py-2 text-white hover:bg-blue-600 px-3 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Create Exam
                            </Link>
                        )}
                        
                        {role !== 'examiner' && (
                            <Link 
                                to="/results" 
                                className="block py-2 text-white hover:bg-blue-600 px-3 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Results
                            </Link>
                        )}
                        
                        <div className="mt-3 pt-3 border-t border-blue-400">
                            <div className="px-3 py-2 text-blue-200">
                                <div>Signed in as <span className="font-bold">{username}</span></div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 text-white hover:bg-blue-600 rounded flex items-center"
                            >
                                <LogOut size={16} className="mr-2" />
                                Sign out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;