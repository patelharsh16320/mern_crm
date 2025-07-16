'use client'
import Link from "next/link";
import { useState, useEffect } from "react"
import { fetchAllUsers, deleteUserById } from '../utils/allapi';
import { toast } from 'react-toastify';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data.users);
        toast.success('Users loaded successfully');
      } catch (err) {
        toast.error('Failed to load users');
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUserById(id);
      toast.success("User deleted successfully");
      // Refresh user list
      setUsers(users.filter(user => user.user_id !== id));
      router.push('/client');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user");
    }
  };

  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    user_id: '',
    username: '',
    email: '',
    password: '',
    c_password: '',
    phone: '',
    address: '',
    doj: '',
  });


  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <>
              <div className="overflow-auto">
                <table className="w-full table-auto border border-gray-300 text-left rounded-lg">
                  <thead className="bg-blue-600 text-white uppercase text-sm">
                    <tr>
                      <th className="px-4 py-2 border">Index</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Phone</th>
                      <th className="px-4 py-2 border">Date of Join</th>
                      <th className="px-4 py-2 border">Address</th>
                      <th className="px-4 py-2 border">Edit</th>
                      <th className="px-4 py-2 border">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-100 text-gray-700">
                        <td className="px-4 py-2 border">{indexOfFirstUser + index + 1}</td>
                        <td className="px-4 py-2 border">{user.name}</td>
                        <td className="px-4 py-2 border">{user.email}</td>
                        <td className="px-4 py-2 border">{user.number}</td>
                        <td className="px-4 py-2 border">
                          {new Date(user.created_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).replace(',', ' at')}
                        </td>
                        <td className="px-4 py-2 border">{user.address}</td>
                        <td className="px-4 py-2 border">
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

                        <td className="px-4 py-2 border">
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

              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
    </>
  );
};

export default UsersPage;
