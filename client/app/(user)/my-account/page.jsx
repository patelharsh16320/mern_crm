'use client';
import { useEffect, useState } from 'react';

export default function MyAccount() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-10">No user data found.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">My Account</h2>
        <ul className="space-y-4 text-gray-700">
          {Object.entries(user).map(([key, value]) => (
            <li key={key}>
              <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
