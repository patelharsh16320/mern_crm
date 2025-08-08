'use client';
import Gsap from '@/app/component/Gsap';

export default function ContactPage() {
  return (
    <>
      <Gsap />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-14 px-4">
        <div className="max-w-6xl mx-auto space-y-14">

          {/* Contact Info Section */}
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

          {/* Contact Form Section */}
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
            <form className="bg-white p-8 rounded-3xl shadow-lg space-y-6 gsap-slide-up border border-gray-100">
              <h2 className="text-3xl font-bold text-blue-800">Get in Touch</h2>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 transition"
              />
              <textarea
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
