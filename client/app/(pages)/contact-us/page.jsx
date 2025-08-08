'use client';

import Gsap from '@/app/component/Gsap';

export default function ContactPage() {
  return (
    <>
      <Gsap />
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-10 shadow-xl space-y-10 gsap-fade-in">
          
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Contact Us
          </h1>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Email', value: 'contact@example.com' },
              { label: 'Address', value: '123 Street, Mumbai, India' }
            ].map(({ label, value }) => (
              <div
                key={label}
                className="text-center p-4 rounded-lg bg-white bg-opacity-70 hover:bg-opacity-100 transition duration-300 shadow-md gsap-fade-in"
              >
                <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>

          {/* Form Section */}
          <div className="gsap-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <img
              src="https://source.unsplash.com/600x400/?gradient,contact"
              alt="Contact Graphic"
              className="rounded-2xl shadow-lg"
            />

            <form className="space-y-6">
              {['Name', 'Email', 'Phone'].map((field) => (
                <input
                  key={field}
                  type={field.toLowerCase()}
                  placeholder={field}
                  className="w-full px-5 py-3 border border-transparent rounded-full focus:outline-none focus:ring-4 focus:ring-pink-300 transition"
                  required
                />
              ))}
              <textarea
                rows="4"
                placeholder="Message"
                className="w-full px-5 py-3 border border-transparent rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition"
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition"
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
