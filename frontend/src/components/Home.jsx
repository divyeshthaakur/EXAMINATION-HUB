import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Users, BarChart, Shield, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 text-gray-900"
    >
      {/* Hero Section */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="bg-blue-500 text-white py-20 px-6 text-center space-y-4"
      >
        <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full mb-6">
          <span className="flex items-center text-sm font-medium">
            <BookOpen size={16} className="mr-2" />
            Examination Hub Platform
          </span>
        </div>
        <h1 className="text-5xl font-bold">Welcome to Examination Hub</h1>
        <p className="mt-4 text-lg">Your Gateway to Seamless Online Assessments</p>
        <button 
          className="mt-6 bg-white text-blue-600 hover:bg-blue-200 px-6 py-2 text-lg rounded-md flex items-center mx-auto"
          onClick={() => navigate("/dashboard")}
        >
          Explore Now
          <ArrowRight className="ml-2" size={20} />
        </button>
      </motion.header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {[
          { src: "https://img.freepik.com/premium-vector/vector-illustration-about-learning-education-personal-development-concept_675567-5549.jpg?ga=GA1.1.2140671173.1733321967&semt=ais_hybrid&w=740", title: "Effortless Exam Management", text: "Create, manage, and grade exams with ease.", icon: <BookOpen className="text-blue-500" size={24} /> },
          { src: "https://img.freepik.com/premium-vector/achievement-award-grant-diploma-concepts_165488-6366.jpg?ga=GA1.1.2140671173.1733321967&semt=ais_hybrid&w=740", title: "Instant Results & Analytics", text: "Get real-time performance insights.", icon: <BarChart className="text-blue-500" size={24} /> },
          { src: "https://img.freepik.com/premium-vector/vector-illustration-about-cyber-security-education-concept-online-safety-education_675567-8724.jpg?ga=GA1.1.2140671173.1733321967&semt=ais_hybrid&w=740", title: "Secure & Reliable", text: "Built with robust security measures.", icon: <Shield className="text-blue-500" size={24} /> }
        ].map((feature, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              {feature.icon}
            </div>
            <img src={feature.src} alt={feature.title} className="h-32 w-32 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Additional Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Examination Hub</h2>
            <p className="mt-4 text-gray-600">Experience the future of online examinations</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="text-blue-500" size={24} />, title: "Time-Saving", desc: "Automated grading and instant results" },
              { icon: <Users className="text-blue-500" size={24} />, title: "Scalable", desc: "Handle thousands of concurrent test-takers" },
              { icon: <CheckCircle className="text-blue-500" size={24} />, title: "Accurate", desc: "Precise grading and evaluation" },
              { icon: <Shield className="text-blue-500" size={24} />, title: "Secure", desc: "Advanced anti-cheating measures" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-all"
              >
                <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        viewport={{ once: true }}
        className="bg-gray-200 py-16"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { 
                text: "This platform has made online exams a breeze!", 
                name: "Jane Doe", 
                role: "University Professor", 
                img: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
              },
              { 
                text: "Secure, fast, and reliable. Highly recommended!", 
                name: "John Smith", 
                role: "Education Director", 
                img: "https://img.freepik.com/free-photo/young-businessman-wearing-suit-standing-with-arms-crossed-white-background_1258-57993.jpg"
              }
            ].map((testimonial, index) => (
              <motion.blockquote 
                key={index} 
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md max-w-sm flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 border bg-cover border-gray-300 object-cover"
                />
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <span className="text-blue-600 font-semibold mt-2">{testimonial.name}</span>
                <span className="text-gray-500 text-sm">{testimonial.role}</span>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "2M+", label: "Exams Taken" },
              { number: "5K+", label: "Institutions" },
              { number: "150+", label: "Countries" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(59,130,246,0.15)",
                }}
              >
                <h3 className="text-4xl font-bold text-blue-500 mb-2">{stat.number}</h3>
                <p className="text-gray-700 uppercase tracking-wide text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action */}
      <motion.footer 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center py-12 bg-blue-500 text-white space-y-4"
      >
        <h3 className="text-2xl font-semibold">Start Your Journey Today</h3>
        <p className="mt-2 text-lg">Join thousands of students and examiners using Examination Hub.</p>
        <button 
          className="mt-4 bg-white text-blue-600 hover:bg-blue-300 px-6 py-2 text-lg rounded-md"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </motion.footer>
    </motion.div>
  );
}