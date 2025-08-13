'use client';
import React, { useEffect, useState } from 'react';
import { fetchSingleInvoice } from '@/app/(api)/utils/showAllData';
import { useSearchParams } from 'next/navigation';

export default function SingleInvoicePage() {
  const [invoice, setInvoice] = useState(null);
  const [email, setEmail] = useState('');
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('id');

  useEffect(() => {
    if (invoiceId) {
      fetchSingleInvoice(invoiceId)
        .then(data => setInvoice(data.data))
        .catch(err => console.error(err));
    }
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setEmail(parsedUser.email || '');
    }
  }, [invoiceId]);

  if (!invoice) {
    return <p className="p-10 text-lg text-center animate-pulse">Loading invoice...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CRMSpare</h1>
          <span className="text-sm">Invoice #{invoice.invoice_number}</span>
        </div>

        {/* Total */}
        <div className="px-6 py-4 text-center border-b">
          <p className="text-gray-500 text-sm">Amount Due</p>
          <p className="text-4xl font-extrabold text-indigo-700">₹{invoice.total}</p>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 px-6 py-4 border-b">
          <div className="bg-white rounded-lg p-3 border shadow-sm">
            <p className="text-xs text-gray-500">Customer</p>
            <p className="font-semibold">{invoice.user_name}</p>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border shadow-sm">
            <p className="text-xs text-gray-500">Invoice Date</p>
            <p className="font-semibold">{new Date(invoice.invoice_date).toLocaleDateString()}</p>
            <p className="text-xs text-gray-600">Order #{invoice.order_number}</p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="px-6 py-4 border-b">
          <p className="text-xs text-gray-500 mb-1">Payment Method</p>
          <p className="font-semibold">{invoice.payment_method}</p>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-b space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{invoice.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>₹{invoice.shipping}</span>
          </div>
          <div className="flex justify-between font-semibold text-indigo-700">
            <span>Total</span>
            <span>₹{invoice.total}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 text-center text-xs text-gray-500 relative">
          <p>Thank you for shopping with CRMSpare!</p>
          <p>If you have questions about this invoice, contact us at <a href="mailto:ignore@gmail.com">ignore@gmail.com</a></p>
          <span className="absolute bottom-3 right-3 opacity-10 text-6xl font-bold select-none">CRM</span>
        </div>
      </div>
    </div>
  );
}
 