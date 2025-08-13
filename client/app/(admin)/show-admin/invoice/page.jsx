'use client';
import React, { useEffect, useState } from 'react';
import { fetchAllInvoice } from '../../../(api)/utils/showAllData';
import { deleteInvoiceById, deleteAllInvoice } from '../../../(api)/utils/allapi';
import { toast } from 'react-toastify';
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function InvoicePage() {
  const router = useRouter();
  const [invoice, setInvoice] = useState([]);

  const tableHeaders = [
    "#",
    "User Name",
    "Invoice Number",
    "Order Number",
    "Payment Method",
    "Subtotal",
    "Shipping",
    "Total",
    "Date",
    "Actions"
  ];

  useEffect(() => {
    const ApiInvoice = async () => {
      try {
        const data = await fetchAllInvoice();
        setInvoice(data.users);
        toast.success('Invoices loaded successfully');
      } catch (err) {
        console.error(err);
        toast.error('Failed to load invoices');
      }
    };
    ApiInvoice();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await deleteInvoiceById(id);
      toast.success("Invoice deleted successfully");
      setInvoice(invoice.filter(inv => inv.invoice_id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete invoice");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📄 All Invoices</h1>
          <p className="text-gray-600">Track and manage all your invoices with ease.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={async () => {
              if (!confirm("Are you sure you want to delete all invoices?")) return;
              try {
                const res = await deleteAllInvoice();
                toast.success(res.message);
                setInvoice([]);
              } catch (err) {
                toast.error(err.message || "Failed to delete invoices");
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            🗑 Delete All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0">
              <tr>
                {tableHeaders.map((header, i) => (
                  <th key={i} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.length > 0 ? (
                invoice.map((inv, index) => (
                  <tr
                    key={inv.invoice_id}
                    className={`transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{inv.user_name}</td>
                    <td className="px-6 py-4">{inv.invoice_number}</td>
                    <td className="px-6 py-4">{inv.order_number}</td>
                    <td className="px-6 py-4">{inv.payment_method}</td>
                    <td className="px-6 py-4">₹{inv.subtotal}</td>
                    <td className="px-6 py-4">₹{inv.shipping}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{inv.total}</td>
                    <td className="px-6 py-4">{new Date(inv.invoice_date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td className="px-6 py-4">
                      <button
                        title="Delete Invoice"
                        onClick={() => handleDelete(inv.invoice_id)}
                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={tableHeaders.length} className="px-6 py-6 text-center text-gray-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
