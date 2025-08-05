'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Users = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Briefcase = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const TrendingUp = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const CheckCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const BarChart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;
const Headset = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
const Settings = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.28a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.74v.44a2 2 0 0 1-1 1.73l-.15.08a2 2 0 0 0-.73 2.73l.78 1.28a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 1-1.74v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.28a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.44a2 2 0 0 1 1-1.73l.15-.08a2 2 0 0 0 .73-2.73l-.78-1.28a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-1-1.74V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const Zap = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;


// Feature data for the CRM
const crmFeatures = [
  {
    icon: Users,
    title: "Contact Management",
    description: "Organize and track all customer interactions, details, and history in one place.",
  },
  {
    icon: Briefcase,
    title: "Lead Management",
    description: "Capture, qualify, and nurture leads efficiently to convert them into loyal customers.",
  },
  {
    icon: TrendingUp,
    title: "Sales Pipeline",
    description: "Visualize and manage your sales opportunities through every stage of the funnel.",
  },
  {
    icon: CheckCircle,
    title: "Task Automation",
    description: "Automate repetitive tasks, set reminders, and streamline workflows for productivity.",
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description: "Gain actionable insights with comprehensive reports and real-time performance metrics.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description: "Provide exceptional support with integrated tools for ticketing, knowledge base, and live chat.",
  },
  {
    icon: Settings,
    title: "Customization",
    description: "Tailor the CRM to fit your unique business needs with flexible customization options.",
  },
  {
    icon: Zap,
    title: "Integrations",
    description: "Connect seamlessly with your favorite tools and applications for a unified ecosystem.",
  },
];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  // Added hover state directly to itemVariants
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.2,
    },
  },
};

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.6, // Delay after text appears
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.2,
    },
  },
};

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCtaClick = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
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
    <div className="min-h-screen bg-slate-50 text-gray-900 overflow-hidden">
      {/* Modal Component */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal} // Close modal when clicking outside
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">Action Taken!</h3>
              <p className="text-gray-700 mb-6">{modalMessage}</p>
              <button
                onClick={closeModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Got It!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      {/* <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-indigo-700"
          >
            CRM<span className="text-gray-800">Sphere</span>
          </motion.div>
          <nav>
            <ul className="flex space-x-6">
              {['Features', 'Solutions', 'Pricing', 'Contact'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200">
                    {item}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + 4 * 0.1 }}
              >
                <button
                  onClick={() => handleCtaClick("You clicked the 'Sign In' button!")}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </button>
              </motion.li>
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background animation elements */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-50 blur-3xl animate-pulse-slow"></div>
          <div className="w-72 h-72 bg-indigo-300 rounded-full mix-blend-overlay opacity-50 blur-3xl animate-pulse-fast absolute top-1/4 left-1/4"></div>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
          >
            <motion.span variants={heroTextVariants}>Transform Your Business with</motion.span><br />
            <motion.span variants={heroTextVariants} className="text-yellow-300">Intelligent CRM Solutions</motion.span>
          </motion.h1>
          <motion.p
            variants={heroTextVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
          >
            <motion.span variants={heroTextVariants}>Streamline sales, enhance customer relationships, and drive growth with our powerful, all-in-one CRM platform.</motion.span>
          </motion.p>
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => handleCtaClick("You clicked 'Get Started Free'!")}
            className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform"
          >
            Get Started Free
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Key CRM Features
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {crmFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants} // Now includes 'hidden', 'show', and 'hover' states
                whileHover="hover" // Refers to the 'hover' state in itemVariants
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center group"
                // Removed the duplicate variants={cardHoverVariants}
              >
                <div className="p-4 bg-indigo-100 rounded-full mb-6 group-hover:bg-indigo-200 transition-colors duration-200">
                  {React.createElement(feature.icon, { className: "w-8 h-8 text-indigo-600" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-medium leading-relaxed italic mb-6"
          >
            "Our sales increased by 40% within the first six months of using CRMSpere. The automation and analytics features are a game-changer!"
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-xl font-semibold text-blue-100"
          >
            — Jane Doe, CEO of TechCorp
          </motion.p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6"
          >
            Ready to Elevate Your Customer Relationships?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of businesses that trust CRMSpere to manage their customer interactions and accelerate growth.
          </motion.p>
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.5 }}
            onClick={() => handleCtaClick("You clicked 'Start Your Free Trial'!")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform"
          >
            Start Your Free Trial
          </motion.button>
        </div>
      </section>

      {/* Footer */}
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

      {/* Custom CSS for pulse animations (Tailwind doesn't have these by default) */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
        }

        @keyframes pulse-fast {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.25;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s infinite ease-in-out;
        }

        .animate-pulse-fast {
          animation: pulse-fast 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
