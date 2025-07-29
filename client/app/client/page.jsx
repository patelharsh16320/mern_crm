'use client';
import { useEffect, useState, useRef } from 'react';
import { fetchAllUsers } from '../(api)/utils/showAllData';
import { useSortable } from '../component/common';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const hasFetched = useRef(false);

  const { sortedData, sortConfig, handleSort } = useSortable(users);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchAllUsers()
        .then(res => {
          setUsers(res?.users || []);
          toast.success('Users loaded');
        })
        .catch(() => toast.error('Failed to load users'));
      hasFetched.current = true;
    }
  }, []);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = sortedData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const columns = [
    { label: '#', key: null },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'number' },
    { label: 'Joined On', key: 'created_at' },
    { label: 'Address', key: 'address' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">👤 All Clients</h1>
          <p className="text-sm bg-blue-100 text-blue-700 px-4 py-2 rounded-md shadow">
            Total: {users.length}
          </p>
        </div>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          <>
            <div className="overflow-auto rounded-lg shadow border">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-blue-600 text-white uppercase tracking-wider">
                  <tr>
                    {columns.map((col, idx) => (
                      <th
                        key={idx}
                        className={`px-4 py-3 ${col.key ? 'cursor-pointer' : ''}`}
                        onClick={col.key ? () => handleSort(col.key) : undefined}
                      >
                        {col.label}
                        {col.key === sortConfig.key && (
                          <span> {sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentUsers.map((user, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{indexOfFirst + idx + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.number}</td>
                      <td className="px-4 py-2">
                        {new Date(user.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-2">{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;