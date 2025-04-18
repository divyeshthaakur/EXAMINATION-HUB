import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateExam from './components/CreateExam';
import Exam from './components/Exam';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './components/Home'
import { Footer } from './components/Footer';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
 
const ExaminerRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role !== 'examiner') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/signup" element={<Auth />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-exam" element={
            <ExaminerRoute>
              <CreateExam />
            </ExaminerRoute>
          } />
          <Route path="/exam/:id" element={
            <ProtectedRoute>
              <Exam />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } />
          <Route path="*" element={
            localStorage.getItem('token') ?
              <Navigate to="/dashboard" /> :
              <Navigate to="/" />
          } />
        </Routes>
      </div>
      {showFooter && <Footer/>}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
