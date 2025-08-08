'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Gsap from '@/app/component/Gsap';
import { createContact } from '../../../(api)/utils/allapi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Get user_id from localStorage if exists
  let user_id = null;
  try {
    const stored = localStorage.getItem('users');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed[0]?.user_id) {
        user_id = parsed[0].user_id;
      }
    }
  } catch (err) {
    console.error('Error reading localStorage:', err);
  }

  // Current datetime in MySQL format
  const now = new Date();
  const created_at = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const payload = {
    user_id,
    name: formData.username,
    email: formData.email,
    number: formData.phone,
    message: formData.message,
    created_at,
  };

  try {
    await createContact(payload);
    toast.success('Message sent successfully!');
    setFormData({ username: '', email: '', phone: '', message: '' });
  } catch (err) {
    toast.error(err.message || 'Failed to send message');
  }
};


  return (
    <>
      <Gsap />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-14 px-4">
        <div className="max-w-6xl mx-auto space-y-14">

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Email', value: 'info@example.com' },
              { label: 'Address', value: '123 Street, Mumbai, India' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 gsap-fade-in"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{label}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="gsap-zoom-in">
              <img
                src="/contact-us.svg"
                alt="Contact"
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-3xl shadow-lg space-y-6 gsap-slide-up border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-blue-800">Get in Touch</h2>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
