'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { fetchAllTicket, deleteTicketById, deleteAllTicket } from '../utils/allapi';

const statusLabelMap = {
    backlog: 'Backlog',
    to_do: 'To Do',
    in_progress: 'In Progress',
    On_hold: 'On Hold',
    review: 'Review',
    done: 'Done',
};

export default function AllTickets() {
  const router = useRouter();
  const [ticket, setTicket] = useState([]);
  const [statusSummary, setStatusSummary] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredTickets.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatStatus = (status) => statusLabelMap[status] || status;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [ticket, selectedStatus, sortConfig]);

  const fetchData = async () => {
    try {
      const data = await fetchAllTicket();
      setTicket(data.users);
      calculateStatusSummary(data.users || []);

      if (showToast) toast.success('Tickets loaded successfully');
    } catch (err) {
      toast.error('Failed to load tickets');
    }
  };

  const calculateStatusSummary = (data) => {
    const summary = data.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});
    const summaryArray = Object.entries(summary).map(([status, count]) => ({
      status,
      count,
    }));
    setStatusSummary(summaryArray);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    let tempTickets = [...ticket];

    if (selectedStatus) {
      tempTickets = tempTickets.filter(t => t.status === selectedStatus);
    }

    if (sortConfig.key) {
      tempTickets.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredTickets(tempTickets);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = async (ticket_id) => {
    const confirmDelete = confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;
    try {
      const res = await deleteTicketById(ticket_id);
      toast.success(res.message);
      fetchData();
    } catch (err) {
      toast.error(err.message || "Failed to delete ticket");
    }
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-10">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Tickets</h1>
            <div className="mb-6">
              <label htmlFor="statusDropdown" className="block mb-2 text-sm font-medium text-gray-700">
                Filter by Status
              </label>
              <div className="mb-4">
                <select
                  id="statusDropdown"
                  className="block w-full max-w-xs p-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statusSummary.map(({ status, count }) => (
                    <option key={status} value={status}>
                      {`${statusLabelMap[status]} (${count})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/ticket/create-ticket"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                + New Ticket
              </Link>
              <button
                onClick={async () => {
                  const confirmDelete = confirm("Are you sure you want to delete all tickets?");
                  if (!confirmDelete) return;
                  try {
                    const res = await deleteAllTicket();
                    toast.success(res.message);
                    setTicket([]);
                  } catch (err) {
                    toast.error(err.message || "Failed to delete all tickets");
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete All
              </button>
            </div>
          </div>

          {filteredTickets.length === 0 ? (
            <p>No tickets found</p>
          ) : (
            <>
              <div className="overflow-auto">
                <table className="w-full table-auto border border-gray-300 text-left rounded-lg">
                  <thead className="bg-blue-600 text-white uppercase text-sm">
                    <tr>
                      <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort('index')}>
                        Index {sortConfig.key === 'index' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                      </th>
                      <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort('subject')}>
                        Subject {sortConfig.key === 'subject' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                      </th>
                      <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort('status')}>
                        Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                      </th>
                      <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort('last_updated')}>
                        Last Updated {sortConfig.key === 'last_updated' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                      </th>
                      <th className="px-4 py-2 border cursor-pointer" onClick={() => requestSort('created_at')}>
                        Last Created {sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                      </th>
                      <th className="px-4 py-2 border">Edit</th>
                      <th className="px-4 py-2 border">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTickets.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100 text-gray-700">
                        <td className="px-4 py-2 border">{indexOfFirstUser + index + 1}</td>
                        <td className="px-4 py-2 border">{item.subject}</td>
                        <td className="px-4 py-2 border">{formatStatus(item.status)}</td>
                        <td className="px-4 py-2 border">
                          {new Date(item.last_updated).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).replace(',', ' at')}
                        </td>
                        <td className="px-4 py-2 border">
                          {new Date(item.created_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }).replace(',', ' at')}
                        </td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => {
                              localStorage.setItem('editTicket', JSON.stringify(item));
                              router.push('/ticket/create-ticket');
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                        </td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleDelete(item.ticket_id)}
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
}
