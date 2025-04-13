import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Exam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const role = localStorage.getItem('role');
    
    useEffect(() => {
        const fetchExam = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/exams/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                
                setExam(response.data);
                setAnswers(Array(response.data.questions.length).fill(''));
                setError(null);
            } catch (error) {
                console.error('Error fetching exam:', error);
                
                
                if (error.response && error.response.status === 403) {
                    setError(error.response.data.message);
                    setTimeout(() => {
                        navigate('/results');
                    }, 3000);
                } else {
                    setError('Failed to load exam. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchExam();
    }, [id, navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/exams/submit', 
                { examId: id, answers }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            alert('Exam submitted successfully!');
            navigate('/results');
        } catch (error) {
            console.error('Error submitting exam:', error);
            
            if (error.response && error.response.data) {
                alert(error.response.data.message || 'Failed to submit exam');
            } else {
                alert('Network error. Please try again.');
            }
        }
    };
    
    if (loading) {
        return <div className="text-center py-8">Loading exam...</div>;
    }
    
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
                <p>{error}</p>
                <p className="mt-2">Redirecting to your results page...</p>
            </div>
        );
    }
    
    return (
        <div className='min-h-[55vh]'>
            {exam && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">{exam.title}</h2>
                    {exam.questions.map((question, index) => (
                        <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
                            <p className="font-semibold">{question.question}</p>
                            {question.options.map((option, optionIndex) => (
                                <label key={optionIndex} className="block mt-2 ml-2">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => {
                                            const newAnswers = [...answers];
                                            newAnswers[index] = option;
                                            setAnswers(newAnswers);
                                        }}
                                        className="mr-2"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    ))}
                    {role==='student'?
                    <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition"
                    >
                        Submit Exam
                    </button>
                    :
                    // <button 
                    //     type="submit" 
                    //     className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                    //     disabled
                    // >
                    <button className='bg-red-500 text-white p-2 rounded transition' disabled>Author can't Attempt</button>
                }
                </form>
            )}
        </div>
    );
};

export default Exam;