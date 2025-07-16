'use client'
import Link from "next/link";
import { useState, useEffect, useRef } from "react"
import { fetchAllTicket, deleteTicketById, deleteAllTicket } from '../utils/allapi';
import { toast } from 'react-toastify';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const TicketPage = () => {
  const router = useRouter();
  const [ticket, setTicket] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const hasFetched = useRef(false);

  const getTicket = async (showToast = true) => {
    try {
      const data = await fetchAllTicket();
      setTicket(data.users);
      if (showToast) toast.success('Tickets loaded successfully');
    } catch (err) {
      toast.error('Failed to load tickets');
    }
  };
  useEffect(() => {
    if (!hasFetched.current) {
      getTicket(true);
      hasFetched.current = true;
    }
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Ticket?")) return;

    try {
      await deleteTicketById(id);
      toast.success("Ticket deleted successfully");
      setTicket(ticket.filter(t => t.ticket_id !== id));
      router.push('/ticket');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete ticket");
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'backlog': return 'Backlog';
      case 'to_do': return 'To Do';
      case 'in_progress': return 'In Progress';
      case 'On_hold': return 'On Hold';
      case 'review': return 'Review';
      case 'done': return 'Done';
      default: return status;
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentTickets = ticket.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(ticket.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-10">
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Tickets</h1>
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

          {ticket.length === 0 ? (
            <p>No tickets found</p>
          ) : (
            <>
              <div className="overflow-auto">
                <table className="w-full table-auto border border-gray-300 text-left rounded-lg">
                  <thead className="bg-blue-600 text-white uppercase text-sm">
                    <tr>
                      <th className="px-4 py-2 border">Index</th>
                      <th className="px-4 py-2 border">Subject</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Last Updated</th>
                      <th className="px-4 py-2 border">Last Created</th>
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
};

export default TicketPage;