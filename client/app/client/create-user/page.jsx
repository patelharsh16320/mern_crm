'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { createUser, updateUser } from '../../utils/allapi';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user_id: '',
    username: '',
    email: '',
    phone: '',
    doj: '',
    address: ''
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const tabledata = [
    { label: 'Username', name: 'username', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone', name: 'phone', type: 'number' },
    { label: 'Date of Join', name: 'doj', type: 'date' }
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
        result = await createUser(formData);
        toast.success('User created successfully!');
      }

      setFormData({
        user_id: '',
        username: '',
        email: '',
        phone: '',
        doj: '',
        address: ''
      });

      setTimeout(() => {
        router.push('/');
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
        doj: new Date(user.created_at).toISOString().slice(0, 10),
        address: user.address
      });
      setIsUpdate(true);
      localStorage.removeItem('editUser');
    }
  }, []);


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
              placeholder={`Enter ${props.label.toLowerCase()}`}
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

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => {
              setFormData({ user_id: '', username: '', email: '', phone: '', doj: '', address: '' });
              setIsUpdate(false);
              router.push('/client');
            }}
            className="px-5 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Cancel
          </button>


          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isUpdate ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Page;