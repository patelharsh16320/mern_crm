'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserRole, deleteRoleById, deleteAllRole } from '../../(api)/utils/allapi';
import { fetchAllRole } from '../../(api)/utils/showAllData';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useSortable } from '../../component/common';

const rolesList = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'sm', label: 'SM' },
  { value: 'qa', label: 'QA' },
];

export default function RolePage() {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getUsers = async () => {
    try {
      const res = await fetchAllRole();
      setRoles(res.users || []);
      toast.success('Users loaded successfully');
    } catch {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => { getUsers(); }, []);
  useEffect(() => { setCurrentPage(1); }, [roles]);

  const { sortedData, sortConfig, handleSort } = useSortable(roles);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginated = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteRoleById(id);
        toast.success('User deleted');
        getUsers();
      } catch {
        toast.error('Failed to delete');
      }
    }
  };

  const handleDeleteAll = async () => {
    if (confirm('Delete all users?')) {
      try {
        const res = await deleteAllRole();
        toast.success(res.message);
        setRoles([]);
      } catch (err) {
        toast.error(err.message || 'Failed to delete all users');
      }
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setModalOpen(true);
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser || !newRole) return;
    if (!confirm(`Update ${selectedUser.email}'s role to ${newRole}?`)) return;
    try {
      const res = await updateUserRole({ email: selectedUser.email, role: newRole });
      res.statusCode === 200 ? toast.success('Role updated') : toast.error(res.message || 'Update failed');
      setModalOpen(false);
      getUsers();
    } catch {
      toast.error('Error updating role');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">User Role Management</h2>
        <button
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 shadow-sm"
        >
          Delete All
        </button>
      </div>

      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('email')}>
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('role')}>
                Role {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginated.map((user, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-gray-700">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                <td className="px-6 py-4 text-gray-800">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {rolesList.find(r => r.value === user.role)?.label || user.role}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-4">
                  <button onClick={() => openModal(user)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user.role_id)} className="text-red-600 hover:text-red-800">
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-600 text-sm">
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">Update Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  value={selectedUser?.email}
                  disabled
                  className="mt-1 w-full px-4 py-2 border rounded bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded text-sm"
                >
                  {rolesList.map((role) => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">Cancel</button>
                <button onClick={handleRoleUpdate} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
