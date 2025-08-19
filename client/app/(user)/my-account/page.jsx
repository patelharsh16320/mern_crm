'use client';
import { useEffect, useState, useRef } from 'react';
import { fetchAllUsers } from '../../(api)/utils/showAllData';
import { toast } from 'react-toastify';
import { gsap } from 'gsap';

const UsersPage = () => {
  const [user, setUser] = useState(null);
  const hasFetched = useRef(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchAllUsers()
        .then(res => {
          const allUsers = res?.users || [];

          // Get logged-in user from localStorage
          const localUser = localStorage.getItem('user');
          if (localUser) {
            const parsedUser = JSON.parse(localUser);
            const foundUser = allUsers.find(
              u => u.user_id === parsedUser.user_id
            );
            setUser(foundUser || null);
          }

          toast.success('User loaded');
        })
        .catch(() => toast.error('Failed to load user'));
      hasFetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (user) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">No user data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div
        ref={cardRef}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          👤 My Account
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name:
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Phone:
            </label>
            <input
              type="text"
              value={user.number}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Address:
            </label>
            <input
              type="text"
              value={user.address}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Joined On:
            </label>
            <input
              type="text"
              value={new Date(user.created_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersPage;