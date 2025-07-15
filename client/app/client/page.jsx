'use client'
import Link from "next/link";
import { useState, useEffect } from "react"
import { fetchAllUsers } from '../utils/allapi';
import { toast } from 'react-toastify';

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        console.log("Fetched data:", data);
        setUsers(data.users);

        toast.success('User loaded Successfully');
      } catch (err) {
        toast.error('Failed to load users');
      }
    }
    getUsers();
  }, []);

  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-10">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Clients</h1>

            <Link
              href="/client/create-user"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              + New Client
            </Link>
          </div>
          {users.length === 0 ? (<p>No users found</p>) : (
            <div className="overflow-auto">
              <table className="w-full table-auto border border-gray-300 text-center rounded-lg">
                <thead className="bg-blue-600 text-white uppercase text-sm">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">Index</th>
                    <th className="px-4 py-2 border border-gray-300">Name</th>
                    <th className="px-4 py-2 border border-gray-300">Email</th>
                    <th className="px-4 py-2 border border-gray-300">Phone</th>
                    <th className="px-4 py-2 border border-gray-300">Date of Join</th>
                    <th className="px-4 py-2 border border-gray-300">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-100 text-gray-700">
                      <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                      <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                      <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                      <td className="px-4 py-2 border border-gray-300">{user.number}</td>
                      <td className="px-4 py-2 border border-gray-300"> {new Date(user.created_at).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      }).replace(',', ' at')}</td>
                      <td className="px-4 py-2 border border-gray-300">{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default page