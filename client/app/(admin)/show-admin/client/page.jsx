'use client'
import Link from "next/link";
import { useState, useEffect, useRef } from "react"
import { deleteUserById, deleteAllUsers } from '../../../(api)/utils/allapi';
import { fetchAllUsers } from '../../../(api)/utils/showAllData';
import { toast } from 'react-toastify';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useSortable } from '../../../component/common';

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const hasFetched = useRef(false);
  const { sortedData: sortedUsers, sortConfig, handleSort } = useSortable(users);

  const getUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data.users);
      toast.success('Users loaded successfully');
    } catch (err) {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      getUsers(true);
      hasFetched.current = true;
    }
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUserById(id);
      toast.success("User deleted successfully");
      setUsers(users.filter(user => user.user_id !== id));
      router.push('/client');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user");
    }
  };

  const columns = [
    { label: 'Index' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'number', label: 'Phone' },
    { key: 'created_at', label: 'Date of Join' },
    { key: 'address', label: 'Address' },
    { label: 'Edit' },
    { label: 'Delete' }
  ]

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

return (
  <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
    <div className="w-full max-w-7xl bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">👥 Client Overview</h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md shadow-sm">
            Total Clients: {users.length}
          </span>
          <Link
            href="/client/create-user"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New Client
          </Link>
          <button
            onClick={async () => {
              const confirmDelete = confirm("Are you sure you want to delete all users?");
              if (!confirmDelete) return;
              try {
                const res = await deleteAllUsers();
                toast.success(res.message);
                setUsers([]);
              } catch (err) {
                toast.error(err.message || "Failed to delete users");
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete All
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No users found.</div>
      ) : (
        <>
          <div className="overflow-auto rounded-lg border border-gray-200">
            <table className="w-full table-auto text-sm text-gray-700">
              <thead className="bg-blue-50 text-blue-800 font-semibold uppercase tracking-wide">
                <tr>
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 border-b text-left"
                      onClick={col.key ? () => handleSort(col.key) : undefined}
                    >
                      <div className="flex items-center gap-1 cursor-pointer">
                        {col.label}
                        {col.key === sortConfig.key && (
                          <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50 border-t">
                    <td className="px-4 py-2">{indexOfFirstUser + i + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.number}</td>
                    <td className="px-4 py-2">
                      {new Date(user.created_at).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </td>
                    <td className="px-4 py-2">{user.address}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          localStorage.setItem('editUser', JSON.stringify(user));
                          router.push('/client/create-user');
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(user.user_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
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