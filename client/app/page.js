'use client';
import { useState, useEffect } from "react";

const Page = () => {
  const [tabledata, setTabledata] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      try {
        // Load user info
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserInfo({ name: user.name, email: user.email });
        }

        // Load data
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

        const totalClient = users.length;
        const totalTicket = tickets.length;
        const pendingCount = tickets.filter(t => t.status === 'in_progress').length;

        setTabledata([
          { name: 'Total Clients', count: totalClient },
          { name: 'Total Tickets', count: totalTicket },
          { name: 'In Progress Tickets', count: pendingCount }
        ]);
      } catch (err) {
        console.error('Failed to read localStorage:', err);
      }
    };

    loadDataFromLocalStorage();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">

        {/* User Info */}
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-700">Welcome, <span className="font-bold">{userInfo.name}</span></p>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Details</h1>
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full table-auto border border-gray-300 text-center rounded-lg">
            <thead className="bg-blue-600 text-white uppercase text-sm">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Index</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Count</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100 text-gray-700">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Page;
