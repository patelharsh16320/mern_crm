'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { createUser, updateUser } from '../../(api)/utils/allapi';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user_id: '', username: '', email: '', phone: '', address: '', created_at: ''
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const tabledata = [
    { label: 'Username', name: 'username', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone', name: 'phone', type: 'number' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'c_password', type: 'password' }
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      if (isUpdate) {
        result = await updateUser(formData);
        toast.success('User updated successfully!');
      } else {
        // Add current datetime as created_at
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        result = await createUser({ ...formData, created_at: currentDateTime });
        toast.success('User created successfully!');
      }

      setFormData({user_id: '', username: '', email: '', phone: '', password: '', c_password: '', address: '', created_at: ''});

      setTimeout(() => {
        router.push('/client');
      }, 1500);

    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('editUser');
    if (userData) {
      const user = JSON.parse(userData);
      setFormData({
        user_id: user.user_id,
        username: user.name,
        email: user.email,
        phone: user.number,
        address: user.address,
        password: user.password,
        c_password: user.c_password,
        created_at: user.created_at
      });
      setIsUpdate(true);
      localStorage.removeItem('editUser');
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl space-y-6"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setFormData({ user_id: '', username: '', email: '', phone: '', password: '', c_password: '', address: '', created_at: '' });
              setIsUpdate(false);
              router.push('/client');
            }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            ← Back
          </button>
        </div>

        {tabledata.map((props, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={props.name}
              className="mb-1 text-sm font-medium text-gray-700"
            >
              {props.label}
            </label>
            <input
              id={props.name}
              name={props.name}
              type={props.type}
              value={formData[props.name]}
              onChange={handleChange}
              placeholder={`Enter ${props.label.toLowerCase()}`}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isUpdate && (
          <input
            type="hidden"
            name="created_at"
            value={new Date().toISOString().slice(0, 19).replace('T', ' ')}
          />
        )}

        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            onClick={() => {
              setFormData({
                user_id: '', username: '', email: '', phone: '', password: '', c_password: '', address: '', created_at: ''
              });
              setIsUpdate(false);
            }}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isUpdate ? 'Update' : 'Save'}
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );

};

export default Page;