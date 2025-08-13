'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginUser } from '../(api)/utils/allapi';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import Gsap from '../component/Gsap';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({ email: '', password: '' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await LoginUser(formData);
      if (data.statusCode === 200) {
        const { password, ...userWithoutSensitiveData } = data.user;

        Cookies.set('user', encodeURIComponent(JSON.stringify(userWithoutSensitiveData)), {
          path: '/',
          expires: 1,
        });

        localStorage.setItem('user', JSON.stringify(userWithoutSensitiveData));

        toast.success('Login successful');
        router.push('/');
      } else if (data.statusCode === 401 || data.statusCode === 404) {
        toast.error(data.message || 'Invalid email or password');
      } else if (data.statusCode === 400) {
        toast.warn(data.message || 'Missing credentials');
      } else {
        toast.error(data.message || 'Unexpected error');
      }
    } catch (err) {
      toast.error('Server error. Please try again.');
    }
  };

  return (
    <>
      <Gsap /> 
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
        <div className="gsap-fade-in max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-100">
          
          {/* Logo / Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-3xl font-bold shadow-md">
              🔐
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-4">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Please sign in to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
 
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange} 
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full p-3 pr-12 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <RiEyeOffFill size={20} /> : <RiEyeFill size={20} />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <button
                type="reset"
                onClick={handleReset}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition"
              >
                Login
              </button>
            </div>
          </form>

          {/* Test credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-500 border border-gray-100">
            <p><span className="font-medium">Username:</span> harsh@gmail.com</p>
            <p><span className="font-medium">Password:</span> harsh123</p>
          </div>
        </div>
      </div>
    </>
  );
}
