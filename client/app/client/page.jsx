'use client'
import Link from "next/link";
import { useState, useEffect } from "react"

const page = () => {
  const [tabledata, setTabledata] = useState([]);

  const fetchData = () => {
    const data = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        doj: '2023-01-10',
        address: '123 Main Street, New York'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9123456780',
        doj: '2022-12-05',
        address: '456 Elm Street, Los Angeles'
      },
      {
        name: 'Rahul Patel',
        email: 'rahul.patel@gmail.com',
        phone: '8888888888',
        doj: '2023-04-21',
        address: 'Ahmedabad, Gujarat'
      }
    ];
    setTabledata(data);
  }

  useEffect(() => {
    fetchData();
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
          
          {/* Table */}
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
                {tabledata.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-gray-700">
                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.doj}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.address}</td>
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
