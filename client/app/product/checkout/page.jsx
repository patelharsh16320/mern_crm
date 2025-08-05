'use client';
import React, { useEffect, useState } from 'react';
import { fetchUpdatedCart } from '../../(api)/utils/showAllData';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const [userData, setUserData] = useState({ name: '', email: '', number: '', address: '' });
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const router = useRouter();

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

  const handlePlaceOrder = () => {
    const order = {
      user: userData,
      cartItems,
      total: calculateTotal(),
      paymentMethod,
      date: new Date().toISOString(),
    };
    localStorage.setItem('order', JSON.stringify(order));

    if (paymentMethod === 'cod') {
      router.push('/product/invoice');
    } else {
      toast.info('Credit Card processing is mocked. Payment successful!');
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
              {[['First name *', firstName], ['Last name *', lastName]].map(([label, val], i) => (
                <div key={i}>
                  <label className="block mb-1">{label}</label>
                  <input className="w-full border px-3 py-2 rounded" defaultValue={val} />
                </div>
              ))}
            </div>
            {[['Street address *', street], ['Town / City *', city], ['Phone *', userData.number], ['Email address *', userData.email]].map(
              ([label, val], i) => (
                <div key={i}>
                  <label className="block mb-1">{label}</label>
                  <input className="w-full border px-3 py-2 rounded" defaultValue={val} />
                </div>
              )
            )}
            <div>
              <label className="block mb-1">Order notes (optional)</label>
              <textarea className="w-full border px-3 py-2 rounded" placeholder="Special notes for delivery" />
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
