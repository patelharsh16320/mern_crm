'use client';

import { useState, useEffect } from 'react';
import {
  createNewTicket,
  updateTicketById,
  deleteTicketById,
  deleteAllTicket,
} from '../utils/allapi';
import { fetchAllTicket } from '../utils/showAllData';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useSortable } from '../component/common';

export default function TicketPage() {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    ticket_id: '',
    subject: '',
    status: '',
  });
  const { sortedData: filteredTickets, sortConfig, handleSort } = useSortable(tickets);

  useEffect(() => {
    getTickets();
  }, []);

  const columns = [
    { label: 'Index' },
    { key: 'subject', label: 'Subject' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Created At' },
    { key: 'last_updated', label: 'Last Updated' },
    { label: 'Edit' },
    { label: 'Delete' }
  ]

  const statusLabels = {
    backlog: 'Backlog',
    to_do: 'To Do',
    in_progress: 'In Progress',
    on_hold: 'On Hold',
    review: 'Review',
    done: 'Done',
  };

  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTickets = async () => {
    try {
      const res = await fetchAllTicket();
      setTickets(res.users || []);
    } catch (err) {
      toast.error('Failed to fetch tickets');
    }
  };

  const openCreateModal = () => {
    setFormData({ ticket_id: '', subject: '', status: '' });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (ticket) => {
    setFormData({
      ticket_id: ticket.ticket_id,
      subject: ticket.subject,
      status: ticket.status,
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    try {
      const res = await deleteTicketById(id);
      toast.success(res.message || 'Ticket deleted');
      getTickets();
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('This will delete ALL tickets. Continue?')) return;
    try {
      const res = await deleteAllTicket();
      toast.success(res.message || 'All tickets deleted');
      getTickets();
    } catch (err) {
      toast.error(err.message || 'Failed to delete all');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      if (isEditMode) {
        const originalTicket = tickets.find(t => t.ticket_id === formData.ticket_id);

        const updateData = {
          old_ticket_id: formData.ticket_id,  // required by backend
          ticket_id: formData.ticket_id,
          subject: formData.subject,
          status: formData.status,
          created_at: originalTicket?.created_at || new Date().toISOString(), // fallback if not found
        };

        result = await updateTicketById(updateData);
      } else {
        const { ticket_id, ...createData } = formData;
        result = await createNewTicket(createData);
      }

      if (result.statusCode === 200 || result.statusCode === 201) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Tickets</h1>
        <div className="flex gap-2">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New Ticket
          </button>
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete All
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100 text-left">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-2 border ${col.key ? 'cursor-pointer' : ''}`}
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
        <tbody>
          {paginatedTickets.map((ticket, index) => (
            <tr key={ticket.ticket_id}>
              <td className="py-2 px-4 border-b"> {(currentPage - 1) * itemsPerPage + index + 1} </td>
              <td className="py-2 px-4 border-b">{ticket.subject}</td>
              <td className="py-2 px-4 border-b">{statusLabels[ticket.status] || ticket.status}</td>

              <td className="py-2 px-4 border-b">
                {new Date(ticket.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }).replace(',', ' at')}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(ticket.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                }).replace(',', ' at')}
              </td>
              <td className="py-2 px-4 border-b space-x-3">
                <button
                  onClick={() => handleEdit(ticket)}
                  className="text-blue-600 hover:underline"
                >
                  <FaEdit />
                </button>
              </td>
              <td className="py-2 px-4 border-b space-x-3">
                <button
                  onClick={() => handleDelete(ticket.ticket_id)}
                  className="text-red-600 hover:underline"
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {isEditMode ? 'Update Ticket' : 'Create New Ticket'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="backlog">Backlog</option>
                  <option value="to_do">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="on_hold">On Hold</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isEditMode ? 'Update' : 'Create'}
                </button>
              </div>
            </form>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: Math.ceil(filteredTickets.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage(prev =>
              Math.min(prev + 1, Math.ceil(filteredTickets.length / itemsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(filteredTickets.length / itemsPerPage)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
