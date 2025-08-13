'use client';
import React, { useEffect, useState } from 'react';

const InvoicePage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) return <p className="p-10 text-lg">Loading invoice...</p>;

  const { user, cartItems, total, paymentMethod, date } = order;
  const [firstName, lastName] = user.name?.split(' ') ?? ['', ''];
  const [street, city] = user.address?.split(',') ?? ['', ''];
  const invoiceNumber = Math.floor(Math.random() * 9000 + 1000);
  const orderNumber = Math.floor(Math.random() * 90000 + 10000);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">CRMSpare</h1>
        <div className="text-right text-sm">
          <p>23871 North Westview Road</p>
          <p>Mount Vernon, Washington</p>
          <p>Phone: 123-456-7890</p>
          <p>Email: ignore@gmail.com</p>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Invoice</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Description:</span> Purchase Order</p>
            <p><span className="font-semibold">Address:</span> {user.address}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.number}</p>
          </div>
          <div>
            <p><span className="font-semibold">Invoice Number:</span> #{invoiceNumber}</p>
            <p><span className="font-semibold">Invoice Date:</span> {new Date(date).toLocaleDateString()}</p>
            <p><span className="font-semibold">Order Number:</span> #{orderNumber}</p>
            <p><span className="font-semibold">Order Date:</span> {new Date(date).toLocaleDateString()}</p>
            <p><span className="font-semibold">Payment Method:</span> {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</p>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 mb-6 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => {
              const price = item.sell_price > 0 && item.sell_price < item.price ? item.sell_price : item.price;
              return (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{item.product_name}</td>
                  <td className="px-4 py-2 border-b">{item.qty}</td>
                  <td className="px-4 py-2 border-b">₹{price}</td>
                  <td className="px-4 py-2 border-b">₹{(price * item.qty).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Total Summary */}
      <div className="text-right space-y-1 text-sm">
        <p><span className="font-semibold">Subtotal:</span> ₹{total.toFixed(2)}</p>
        <p><span className="font-semibold">Shipping:</span> ₹49 via Standard Delivery</p>
        <p className="text-lg font-bold">Total: ₹{(total + 49).toFixed(2)}</p>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-xs text-gray-500">
        <p>Thank you for your business!</p>
        <p>If you have any questions about this invoice, please contact us.</p>
      </div>
    </div>
  );
};

export default InvoicePage;