'use client'
import { useState, useEffect } from "react"
import {  fetchAllTicket } from './(api)/utils/showAllData';
import { fetchAllUsers } from './(api)/utils/showAllData';

const page = () => {
  const [tabledata, setTabledata] = useState([]);
  const [users, setUsers] = useState([]);
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data.users);
        const totalClient = data.users.length;

        const dataTicket = await fetchAllTicket();
        setTicket(dataTicket.users);
        const totalTicket = dataTicket.users.length;

        // Count tickets with status "in_progress"
        const pendingCount = dataTicket.users.filter(t => t.status === 'in_progress').length;

        setTabledata([
          { name: 'Total Clients', count: totalClient },
          { name: 'Total Tickets', count: totalTicket },
          { name: 'In Progress Tickets', count: pendingCount }
        ]);

      } catch (err) {
        toast.error('Failed to load users');
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-10">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Details</h1>
          </div>
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
                {tabledata.map((props, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-gray-700">
                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-300">{props.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{props.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default page