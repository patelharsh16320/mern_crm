'use client';
import React, { useEffect, useState } from 'react';
import { fetchUpdatedCart } from '../../(api)/utils/showAllData';
import { createInvoice } from '../../(api)/utils/allapi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const router = useRouter();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user')) || {};
    const [firstName, lastName] = localUser.name?.split(' ') ?? ['', ''];
    const [street, city] = localUser.address?.split(',') ?? ['', ''];

    setUserData({
      firstName,
      lastName,
      street,
      city,
      phone: localUser.number || '',
      email: localUser.email || '',
      notes: ''
    });
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

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    const localUser = JSON.parse(localStorage.getItem('user')) || {};

    const order = {
      user_id: localUser.user_id,
      invoice_number: `INV-${Date.now()}`,
      order_number: `ORD-${Date.now()}`,
      user_name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phone,
      address: `${userData.street}, ${userData.city}`,
      notes: userData.notes,
      payment_method: paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery',
      subtotal: calculateTotal(),
      shipping: 150,
      total: calculateTotal() + 150,
      invoice_date: new Date().toISOString(),
      products: cartItems
    };

    try {
      const res = await createInvoice(order);
      if (res?.invoice_id) {
        toast.success('Invoice created successfully');
        router.push(`/product/single-invoice?id=${res.invoice_id}`);
      } else {
        toast.error('Invoice created but no ID returned');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">First name *</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={userData.firstName}
                  onChange={e => handleInputChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1">Last name *</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={userData.lastName}
                  onChange={e => handleInputChange('lastName', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Street address *</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={userData.street}
                onChange={e => handleInputChange('street', e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">Town / City *</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={userData.city}
                onChange={e => handleInputChange('city', e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">Phone *</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={userData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">Email address *</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={userData.email}
                onChange={e => handleInputChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">Order notes (optional)</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                value={userData.notes}
                onChange={e => handleInputChange('notes', e.target.value)}
                placeholder="Special notes for delivery"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm space-y-6">
          <h2 className="text-xl font-semibold mb-4 pb-2">Your Order</h2>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left pb-2 font-bold">Product</th>
                <th className="text-right pb-2 font-bold">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cartItems.map((item, i) => {
                const price = item.sell_price > 0 && item.sell_price < item.price ? item.sell_price : item.price;
                return (
                  <tr key={i}>
                    <td className="py-3">{item.product_name} × {item.qty}</td>
                    <td className="py-3 text-right">₹{(price * item.qty).toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="font-semibold">
                <td className="pt-2">Total</td>
                <td className="pt-2 text-right">₹{calculateTotal().toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Payment Method */}
          <div className="pt-4 space-y-3">
            {['card', 'cod'].map(method => (
              <div key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={method}
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <label htmlFor={method} className="text-sm font-medium">
                  {method === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                </label>
              </div>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="bg-gray-100 p-4 rounded space-y-3">
              <input className="w-full border px-3 py-2 rounded" placeholder="Card number" />
              <div className="grid grid-cols-2 gap-2">
                <input className="border px-3 py-2 rounded" placeholder="MM/YY" />
                <input className="border px-3 py-2 rounded" placeholder="CVV" />
              </div>
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-purple-900 text-white py-3 rounded font-medium hover:bg-purple-800 transition mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
