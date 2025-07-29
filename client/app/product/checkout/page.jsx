'use client';
import React, { useEffect, useState } from 'react';
import { fetchUpdatedCart } from '../../(api)/utils/showAllData';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const [userData, setUserData] = useState({ name: '', email: '', number: '', address: '' });
  const [cartItems, setCartItems] = useState([]);

  const [firstName, lastName] = userData.name?.split(' ') ?? ['', ''];
  const [street, city] = userData.address?.split(',') ?? ['', ''];

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user')) || {};
    setUserData(localUser);
  }, []);

  const loadCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
      if (!userId) return toast.error('User not found');
      const result = await fetchUpdatedCart(userId);
      const cartWithQty = (result.data || []).map(item => ({
        ...item,
        qty: Number(item.qty),
      }));
      setCartItems(cartWithQty);
      toast.success('Cart loaded');
    } catch {
      toast.error('Failed to load cart');
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => {
      const price = item.sell_price > 0 && item.sell_price < item.price ? item.sell_price : item.price;
      return acc + price * item.qty;
    }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing details</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {['First name *', 'Last name *'].map((label, i) => (
                <div key={i}>
                  <label className="block mb-1">{label}</label>
                  <input
                    className="w-full border px-3 py-2 rounded"
                    type="text"
                    defaultValue={i ? lastName : firstName}
                  />
                </div>
              ))}
            </div>

            {[
              ['Company name (optional)', 'text'],
              ['Country / Region *', 'text', 'India'],
              ['Street address *', 'text', street],
              ['Apartment, suite, unit, etc. (optional)', 'text'],
              ['Town / City *', 'text', city?.trim()],
              ['State *', 'text', 'Bihar'],
              ['ZIP Code *', 'number'],
              ['Phone *', 'text', userData.number],
              ['Email address *', 'email', userData.email],
            ].map(([label, type, val], i) => (
              <div key={i}>
                <label className="block mb-1">{label}</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type={type}
                  defaultValue={val}
                  placeholder={label.includes('optional') ? label : ''}
                />
              </div>
            ))}

            <div>
              <label className="block mb-1">Order notes (optional)</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                placeholder="Notes about your order, e.g. special notes for delivery."
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm space-y-6 w-full">
          <h2 className="text-xl font-semibold mb-4 pb-2">Your order</h2>
          <table className="w-full text-sm">
            <thead className="">
              <tr>
                <th className="text-left pb-2 font-bold text-gray-900">Product</th>
                <th className="text-right pb-2 font-bold text-gray-900">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cartItems.map((item, i) => {
                const price = item.sell_price > 0 && item.sell_price < item.price ? item.sell_price : item.price;
                return (
                  <tr key={i} className="text-gray-800">
                    <td className="py-3">{item.product_name} × {item.qty}</td>
                    <td className="py-3 text-right font-medium">₹{(price * item.qty).toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="font-semibold text-gray-900">
                <td className="pt-2">Total</td>
                <td className="pt-2 text-right">₹{calculateTotal().toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Gift Card */}
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Have a Square Gift Card?</label>
            <div className="flex">
              <input
                className="flex-grow border px-3 py-2 rounded-l-md focus:outline-none"
                placeholder="Gift card"
              />
              <button className="bg-purple-900 text-white px-4 py-2 rounded-r-md hover:bg-purple-800 transition">Apply</button>
            </div>
          </div>

          {/* Credit Card Info (Mock) */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <input type="radio" checked readOnly />
              <span className="font-medium text-sm">Credit Card</span>
            </div>
            <div className="bg-gray-100 p-4 rounded space-y-3">
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Card number"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="MM/YY"
                />
                <input
                  className="border px-3 py-2 rounded"
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>

          <button className="w-full bg-purple-900 text-white py-3 rounded font-medium hover:bg-purple-800 transition mt-4">
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;