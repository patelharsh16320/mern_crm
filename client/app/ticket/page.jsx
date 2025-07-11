'use client'
import { useState, useEffect } from "react"
import Link from 'next/link'

const page = () => {
  const [tabledata, setTabledata] = useState([]);

  const fetchData = () => {
    const data = [
      { name: 'Biology', Status: 'Backlog', date: '03-04-2025' },
      { name: 'Geography', Status: 'To Do', date: '11-02-2025' },
      { name: 'Philosophy', Status: 'Review', date: '25-08-2025' },
      { name: 'Chemistry', Status: 'Done', date: '19-07-2025' },
      { name: 'English Literature', Status: 'On Hold', date: '06-01-2025' },
      { name: 'Political Science', Status: 'In Progress', date: '28-03-2025' },
      { name: 'Statistics', Status: 'To Do', date: '15-09-2025' },
      { name: 'Psychology', Status: 'Review', date: '12-11-2025' },
      { name: 'Sociology', Status: 'Done', date: '07-06-2025' },
      { name: 'Environmental Science', Status: 'Backlog', date: '21-10-2025' },
      { name: 'Art History', Status: 'In Progress', date: '30-05-2025' },
      { name: 'Computer Science', Status: 'On Hold', date: '09-04-2025' },
      { name: 'Anthropology', Status: 'To Do', date: '16-12-2025' },
      { name: 'Economics', Status: 'Backlog', date: '03-08-2025' },
      { name: 'Physics', Status: 'Done', date: '22-07-2025' }
    ];
    setTabledata(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className='flex justify-center items-start min-h-screen bg-gray-100 px-4 py-10'>
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">               
       <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Ticktes</h1>
            <Link
              href="/ticket/create-ticket"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              + New Ticket
            </Link>
          </div>
          <div className="overflow-auto max-h-[70vh]">
            <table className="w-full table-auto border border-gray-300 text-left rounded-lg">
              <thead className="bg-blue-600 text-white uppercase text-sm">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Index</th>
                  <th className="px-4 py-2 border border-gray-300">Subject</th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                  <th className="px-4 py-2 border border-gray-300">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {tabledata.map((props, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-gray-700">
                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-300">{props.name}</td>
                    <td className={`px-4 py-2 border border-gray-300 font-semibold 
                      ${props.Status === 'Done' ? 'text-green-600' :
                        props.Status === 'Backlog' ? 'text-red-500' :
                        props.Status === 'To Do' ? 'text-blue-500' :
                        props.Status === 'Review' ? 'text-yellow-600' :
                        props.Status === 'In Progress' ? 'text-purple-600' :
                        props.Status === 'On Hold' ? 'text-orange-500' : 'text-gray-700'}
                    `}>
                      {props.Status}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{props.date}</td>
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

export default page;
