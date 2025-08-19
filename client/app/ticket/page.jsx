'use client';

import { useState, useEffect } from 'react';
import {
  createNewTicket,
  updateTicketById,
  deleteTicketById,
  deleteAllTicket,
} from '../(api)/utils/allapi';
import { fetchAllTicket } from '../(api)/utils/showAllData';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSortable } from '../component/common';

export default function TicketPage() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({ ticket_id: '', subject: '', status: 'backlog' }); // ✅ default backlog
  const { sortedData, sortConfig, handleSort } = useSortable(tickets);

  const statusLabels = {
    backlog: 'Backlog',
    to_do: 'To Do',
    in_progress: 'In Progress',
    on_hold: 'On Hold',
    review: 'Review',
    done: 'Done',
  };

  const statusColors = {
    backlog: 'bg-gray-300 text-gray-800',
    to_do: 'bg-yellow-300 text-yellow-900',
    in_progress: 'bg-blue-300 text-blue-900',
    on_hold: 'bg-red-300 text-red-900',
    review: 'bg-yellow-200 text-yellow-800',
    done: 'bg-green-300 text-green-900',
  };

  useEffect(() => { getTickets(); }, []);

  const getTickets = async () => {
    try {
      const res = await fetchAllTicket();
      setTickets(res.users || []);
    } catch {
      toast.error('Failed to fetch tickets');
    }
  };

  const openCreateModal = () => {
    setFormData({ ticket_id: '', subject: '', status: 'backlog' }); // ✅ default backlog
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (ticket) => {
    setFormData({ ticket_id: ticket.ticket_id, subject: ticket.subject, status: ticket.status });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = isEditMode
        ? await updateTicketById({
            ...formData,
            old_ticket_id: formData.ticket_id,
            created_at: tickets.find(t => t.ticket_id === formData.ticket_id)?.created_at || new Date().toISOString(),
          })
        : await createNewTicket({
            subject: formData.subject,
            status: formData.status || 'backlog', // ✅ fallback if empty
          });

      if ([200, 201].includes(result.statusCode)) {
        toast.success(result.message || 'Success');
        setShowModal(false);
        getTickets();
      } else {
        toast.error(result.message || 'Failed to save');
      }
    } catch (err) {
      toast.error(err.message || 'Server error');
    }
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const filteredTicketsByStatus = sortedData.filter(ticket =>
    statusFilter === 'all' ? true : ticket.status === statusFilter
  );

  const paginatedTickets = filteredTicketsByStatus.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredTicketsByStatus.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">🎟 Ticket Management</h1>
        <div className="flex gap-3 items-center">
          <span className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow">Total: {tickets.length}</span>

          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="border p-2 rounded"
          >
            <option value="all">All Statuses</option>
            {Object.entries(statusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <button onClick={openCreateModal} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition">
            + New Ticket
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              {['Index', 'Subject', 'Status', 'Created At', 'Last Updated', 'Edit'].map((label, i) => (
                <th
                  key={i}
                  className="px-4 py-3 border-b text-gray-700 font-semibold cursor-pointer"
                  onClick={() => handleSort(label.toLowerCase().replace(/ /g, '_'))}
                >
                  {label} {sortConfig.key === label.toLowerCase().replace(/ /g, '_') && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((ticket, i) => (
              <tr key={ticket.ticket_id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 border-b">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                <td className="py-3 px-4 border-b">{ticket.subject}</td>
                <td className="py-3 px-4 border-b">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[ticket.status] || 'bg-gray-200 text-gray-800'}`}>
                    {statusLabels[ticket.status] || ticket.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">{new Date(ticket.created_at).toLocaleString()}</td>
                <td className="py-3 px-4 border-b">{new Date(ticket.created_at).toLocaleString()}</td>
                <td className="py-3 px-4 border-b">
                  <button onClick={() => handleEdit(ticket)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded disabled:opacity-50 bg-white shadow hover:bg-gray-100">Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 border rounded shadow ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded disabled:opacity-50 bg-white shadow hover:bg-gray-100">Next</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{isEditMode ? 'Update Ticket' : 'Create Ticket'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                placeholder="Subject" 
                required 
                className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-blue-300" 
              />
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                required 
                className="w-full border p-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">{isEditMode ? 'Update' : 'Create'}</button>
              </div>
            </form>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>✕</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
