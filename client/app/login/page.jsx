'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginUser } from '../(api)/utils/allapi';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
          expires: 1, // in days
        })

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="reset"
              onClick={handleReset}
              className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
        <div className='grid'>
          <p>Username: harsh@gmail.com</p>
          <p>Password: harsh123</p>
        </div>
      </div>
    </div>
  );
}
