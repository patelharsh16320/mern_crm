'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../../utils/allapi';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    doj: '',
    address: ''
  });

  const [tabledata, setTabledata] = useState([]);

  const fetchData = () => {
    const data = [
      { label: 'Username', name: 'username', type: 'text' },
      { label: 'Email', name: 'email', type: 'email' },
      { label: 'Phone', name: 'phone', type: 'number' },
      { label: 'Date of Join', name: 'doj', type: 'date' }
    ];
    setTabledata(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // inside your handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createUser(formData);
      toast.success('User created successfully!');
      setTimeout(() => {
        router.push('/client');
      }, 1500);
      // setFormData({ username: '', email: '', phone: '', doj: '', address: '' });

    } catch (err) {
      toast.error(err.message || 'Server error while creating user');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg space-y-6"
      >
        {tabledata.map((props, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              {props.label}
            </label>
            <input
              id={props.name}
              name={props.name}
              type={props.type}
              value={formData[props.name]}
              onChange={handleChange}
              placeholder="Enter value"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => setFormData({ username: '', email: '', phone: '', doj: '', address: '' })}
            className="px-5 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Page;
