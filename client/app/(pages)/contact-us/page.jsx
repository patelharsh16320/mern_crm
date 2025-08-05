'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Placeholder for Lucide React icons
const Mail = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const Phone = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const MapPin = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const Facebook = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const Twitter = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-19 11.6 9.2-1 14.3-5 17-8.9C18.5 7.1 22 4 22 4z" /></svg>;
const Linkedin = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /></svg>;


// Animation variants for Framer Motion
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const socialIconVariants = {
    hover: { scale: 1.2, color: '#6366f1', transition: { duration: 0.2 } }, // Tailwind indigo-500
};

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState(''); // 'success', 'error', ''

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        // Simulate API call
        setTimeout(() => {
            if (formData.name && formData.email && formData.message) {
                setFormStatus('success');
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                setFormStatus('error');
            }
        }, 1500);
    };

    useEffect(() => {
        // Basic setup for Tailwind CSS if not already linked in the environment
        const link = document.createElement('link');
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Add Inter font
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        document.body.style.fontFamily = "'Inter', sans-serif";
        document.body.style.backgroundColor = '#f8fafc'; // bg-slate-50
    }, []);

    return (
        <motion.div
            className="min-h-screen bg-slate-50 text-gray-900 overflow-hidden"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Contact Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                    >
                        Get in Touch with Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
                    >
                        We'd love to hear from you! Send us a message, and we'll get back to you as soon as possible.
                    </motion.p>
                </div>
            </section>

            {/* Contact Form and Info Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center lg:text-left">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={formItemVariants}>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    placeholder="John Doe"
                                    required
                                />
                            </motion.div>
                            <motion.div variants={formItemVariants} transition={{ delay: 0.1 }}>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    placeholder="john.doe@example.com"
                                    required
                                />
                            </motion.div>
                            <motion.div variants={formItemVariants} transition={{ delay: 0.2 }}>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 resize-y"
                                    placeholder="Tell us how we can help..."
                                    required
                                ></textarea>
                            </motion.div>
                            <motion.button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            {formStatus === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 mt-4 text-center font-semibold"
                                >
                                    Message sent successfully! We'll get back to you soon.
                                </motion.p>
                            )}
                            {formStatus === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-600 mt-4 text-center font-semibold"
                                >
                                    Failed to send message. Please fill in all fields.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 md:p-12 rounded-xl shadow-lg flex flex-col justify-center"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">Contact Information</h2>
                        <div className="space-y-6">
                            <motion.div variants={formItemVariants} transition={{ delay: 0.3 }} className="flex items-center space-x-4">
                                <Mail className="w-8 h-8 text-white" />
                                <div>
                                    <h4 className="font-semibold text-lg">Email Us</h4>
                                    <p className="text-indigo-100">support@crmsphere.com</p>
                                </div>
                            </motion.div>
                            <motion.div variants={formItemVariants} transition={{ delay: 0.4 }} className="flex items-center space-x-4">
                                <Phone className="w-8 h-8 text-white" />
                                <div>
                                    <h4 className="font-semibold text-lg">Call Us</h4>
                                    <p className="text-indigo-100">+1 (555) 123-4567</p>
                                </div>
                            </motion.div>
                            <motion.div variants={formItemVariants} transition={{ delay: 0.5 }} className="flex items-center space-x-4">
                                <MapPin className="w-8 h-8 text-white" />
                                <div>
                                    <h4 className="font-semibold text-lg">Our Office</h4>
                                    <p className="text-indigo-100">123 CRM Lane, Suite 400</p>
                                    <p className="text-indigo-100">Tech City, TX 78701, USA</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Media Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mt-10 pt-6 border-t border-indigo-400 flex justify-center lg:justify-start space-x-6"
                        >
                            <motion.a href="#" whileHover="hover" variants={socialIconVariants} className="text-white hover:text-indigo-200 transition-colors duration-200">
                                <Facebook className="w-7 h-7" />
                            </motion.a>
                            <motion.a href="#" whileHover="hover" variants={socialIconVariants} className="text-white hover:text-indigo-200 transition-colors duration-200">
                                <Twitter className="w-7 h-7" />
                            </motion.a>
                            <motion.a href="#" whileHover="hover" variants={socialIconVariants} className="text-white hover:text-indigo-200 transition-colors duration-200">
                                <Linkedin className="w-7 h-7" />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer (re-used from CRM Homepage for consistency) */}
            <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-400 text-sm"
                >
                    &copy; {new Date().getFullYear()} CRMSphere. All rights reserved.
                </motion.p>
            </footer>
        </motion.div>
    );
};

export default App;
