'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { allRoles, updateUserRole, deleteRoleById, deleteAllRole } from '../../utils/allapi';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

const rolesList = ['admin', 'user', 'sm', 'qa'];

export default function RolePage() {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  const getUsers = async () => {
    try {
      const data = await allRoles();
      setRoles(data.users || []);
      toast.success('Users loaded successfully');
    } catch (err) {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteRoleById(id);
      toast.success("User deleted successfully");
      setUsers(users.filter(user => user.user_id !== id));
      router.push('/client');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user");
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser || !newRole) return;

    const confirmUpdate = confirm(`Update role for ${selectedUser.email} to "${newRole}"?`);
    if (!confirmUpdate) return;

    try {
      const res = await updateUserRole({ email: selectedUser.email, role: newRole });

      if (res.statusCode === 200) {
        toast.success('Role updated successfully');
        setIsModalOpen(false);
        getUsers();
      } else {
        toast.error(res.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Error updating role');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Roles</h2>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              const confirmDelete = confirm("Are you sure you want to delete all users?");
              if (!confirmDelete) return;

              try {
                const res = await deleteAllRole();
                toast.success(res.message);
                setUsers([]);
              } catch (err) {
                toast.error(err.message || "Failed to delete all users");
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete All
          </button>

        </div>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Edit</th>
            <th className="p-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border"> <button onClick={() => openModal(user)} className="text-blue-600 hover:text-blue-800"> <FaEdit /> </button> </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(user.role_id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Update Role</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="text"
                value={selectedUser?.email}
                disabled
                className="w-full border px-3 py-2 rounded bg-gray-100 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              >
                {rolesList.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
