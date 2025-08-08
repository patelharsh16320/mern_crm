'use client';
import { useEffect, useState, useMemo } from "react";
import { fetchAllContact } from '../../../(api)/utils/showAllData';
import { deleteContactById, deleteAllContact } from '../../../(api)/utils/allapi';
import { toast } from 'react-toastify';

export default function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch all contacts
  const loadContacts = async () => {
    try {
      const res = await fetchAllContact();
      setContacts(res.users || []);
      toast.success("Messages loaded");
    } catch {
      toast.error("Failed to load Messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadContacts(); }, []);

  // Sorting handler
  const requestSort = key => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : prev.direction === "desc" ? null : "asc" }
        : { key, direction: "asc" }
    );
  };

  // Apply sorting
  const sortedContacts = useMemo(() => {
    let data = [...contacts];
    if (sortConfig.key && sortConfig.direction) {
      data.sort((a, b) => {
        let x = a[sortConfig.key], y = b[sortConfig.key];
        if (sortConfig.key === "created_at") { x = new Date(x); y = new Date(y); }
        return sortConfig.direction === "asc" ? (x > y ? 1 : -1) : (x < y ? 1 : -1);
      });
    }
    return data;
  }, [contacts, sortConfig]);

  const currentRows = sortedContacts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(sortedContacts.length / rowsPerPage);

  // Delete single row
  const delRow = async (id) => {
    if (!confirm("Delete this contact?")) return;
    try {
      await deleteContactById(id);
      setContacts(prev => prev.filter(c => c.contact_id !== id));
      toast.success("Contact deleted");
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  // Delete all rows
  const delAll = async () => {
    if (!confirm("Delete ALL contacts?")) return;
    try {
      await deleteAllContact();
      setContacts([]);
      toast.success("All contacts deleted");
    } catch {
      toast.error("Failed to delete all contacts");
    }
  };

  const sortIcon = col => sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : "";

  const columns = [
    { key: "contact_id", label: "#" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "number", label: "Number" },
    { key: "message", label: "Message" },
    { key: "created_at", label: "Created At" }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-800">📩 All Messages</h1>
          <button onClick={delAll} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete All</button>
        </div>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <tr>
                    {columns.map(col => (
                      <th key={col.key} className="px-4 py-3 border cursor-pointer" onClick={() => requestSort(col.key)}>
                        {col.label} {sortIcon(col.key)}
                      </th>
                    ))}
                    <th className="px-4 py-3 border">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length ? currentRows.map((c, i) => (
                    <tr key={c.contact_id} className="hover:bg-blue-50">
                      <td className="border px-4 py-3">{(page - 1) * rowsPerPage + i + 1}</td>
                      <td className="border px-4 py-3">{c.name}</td>
                      <td className="border px-4 py-3">{c.email}</td>
                      <td className="border px-4 py-3">{c.number}</td>
                      <td className="border px-4 py-3">{c.message}</td>
                      <td className="border px-4 py-3">
                        {new Date(c.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="border px-4 py-3 text-center">
                        <button onClick={() => delRow(c.contact_id)} className="px-3 py-1 bg-red-500 text-white rounded">🗑</button>
                      </td>
                    </tr>
                  )) : <tr><td colSpan="7" className="text-center py-4">No data</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
