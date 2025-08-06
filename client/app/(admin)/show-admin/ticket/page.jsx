'use client';

import { useState, useEffect } from 'react';
import {
  createNewTicket,
  updateTicketById,
  deleteTicketById,
  deleteAllTicket,
} from '../../../(api)/utils/allapi';
import { fetchAllTicket } from '../../../(api)/utils/showAllData';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaRegTrashAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useSortable } from '../../../component/common';

export default function ShowAdmin() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({ ticket_id: '', subject: '', status: '' });
  const filteredData = selectedStatus === 'all'
    ? tickets
    : tickets.filter(ticket => ticket.status === selectedStatus);

  const { sortedData: filteredTickets, sortConfig, handleSort } = useSortable(filteredData);

  const statusLabels = {
    backlog: 'Backlog', to_do: 'To Do', in_progress: 'In Progress',
    on_hold: 'On Hold', review: 'Review', done: 'Done',
  };
  const statusColors = {
    backlog: 'bg-gray-300 text-gray-800', to_do: 'bg-yellow-300 text-yellow-900',
    in_progress: 'bg-blue-300 text-blue-900', on_hold: 'bg-red-300 text-red-900',
    review: 'bg-yellow-200 text-yellow-800', done: 'bg-green-300 text-green-900',
  };

  useEffect(() => { getTickets(); }, []);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getTickets = async () => {
    try {
      const res = await fetchAllTicket();
      setTickets(res.users || []);
    } catch { toast.error('Failed to fetch tickets'); }
  };

  const openCreateModal = () => {
    setFormData({ ticket_id: '', subject: '', status: '' });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (t) => {
    setFormData({ ticket_id: t.ticket_id, subject: t.subject, status: t.status });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this ticket?')) return;
    try {
      const res = await deleteTicketById(id);
      toast.success(res.message || 'Deleted');
      getTickets();
    } catch (err) { toast.error(err.message || 'Failed'); }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Delete ALL tickets?')) return;
    try {
      const res = await deleteAllTicket();
      toast.success(res.message || 'All deleted');
      getTickets();
    } catch (err) { toast.error(err.message || 'Failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      const commonData = {
        ticket_id: formData.ticket_id,
        subject: formData.subject,
        status: formData.status,
        last_updated: new Date().toISOString(),
      };

      if (isEditMode) {
        const original = tickets.find(t => t.ticket_id === formData.ticket_id);
        res = await updateTicketById({
          ...commonData,
          old_ticket_id: formData.ticket_id,
          created_at: original?.created_at || new Date().toISOString(),
        });
      } else {
        res = await createNewTicket(commonData);
      }

      if ([200, 201].includes(res.statusCode)) {
        toast.success(res.message || 'Saved');
        setShowModal(false);
        getTickets();
      } else toast.error(res.message || 'Error');
    } catch (err) {
      toast.error(err.message || 'Server error');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold text-gray-800">Ticket Management</h1>
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="statusFilter" className="font-medium text-gray-700">Filter by Status:</label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="all">All</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <span className="px-4 py-2 bg-purple-600 text-white rounded-md shadow">Total: {tickets.length}</span>
          <button onClick={openCreateModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FaPlus /> New
          </button>
          <button onClick={handleDeleteAll} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            <FaTrashAlt /> Delete All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow border">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-100">
            <tr>
              {['#', 'Subject', 'Status', 'Created At', 'Last Updated', 'Actions'].map((h, i) => (
                <th key={i} className="p-3 border text-left">
                  {['Subject', 'Status'].includes(h) ? (
                    <span onClick={() => handleSort(h.toLowerCase().replace(" ", "_"))} className="cursor-pointer">
                      {h} {sortConfig.key === h.toLowerCase().replace(" ", "_") && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                    </span>
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.map((t, i) => (
              <tr key={t.ticket_id} className="hover:bg-gray-50">
                <td className="p-3 border">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                <td className="p-3 border">{t.subject}</td>
                <td className="p-3 border">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[t.status] || 'bg-gray-200 text-gray-800'}`}>
                    {statusLabels[t.status] || t.status}
                  </span>
                </td>
                <td className="p-3 border">{new Date(t.created_at).toLocaleString()}</td>
                <td className="p-3 border">{new Date(t.last_updated || t.created_at).toLocaleString()}</td>
                <td className="p-3 border flex gap-3">
                  <button onClick={() => handleEdit(t)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                  <button onClick={() => handleDelete(t.ticket_id)} className="text-red-600 hover:text-red-800"><FaRegTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        {Array.from({ length: Math.ceil(filteredTickets.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : ''}`}>{i + 1}</button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filteredTickets.length / itemsPerPage)))} disabled={currentPage === Math.ceil(filteredTickets.length / itemsPerPage)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{isEditMode ? 'Update Ticket' : 'Create New Ticket'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['subject', 'status'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  {field === 'subject' ? (
                    <input name={field} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} required className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500" />
                  ) : (
                    <select name={field} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} required className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500">
                      {/* <option value="">Select status</option> */}
                      {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{isEditMode ? 'Update' : 'Create'}</button>
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
