// 'use client';

// import { useEffect, useState } from 'react';
// import { getCart, deleteCartById, deleteAllCart } from '../../(api)/utils/allapi';
// import Link from 'next/link';
// import { toast } from 'react-toastify';

// export default function CartPage() {
//   const [cart, setCart] = useState(null);
//   const userId = 1; // 🔑 Replace with logged-in user_id (from cookie/auth)

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     const data = await getCart(userId);
//     console.log('Cart Data =>', data);
//     setCart(data);
//   };

//   const handleRemoveItem = async (productId) => {
//     try {
//       await deleteCartById(productId); // <-- depends on backend
//       toast.success('Item removed from cart');
//       fetchCart();
//     } catch (error) {
//       toast.error('Failed to remove item');
//     }
//   };

//   const handleClearCart = async () => {
//     try {
//       await deleteAllCart(userId); // pass userId if backend expects it
//       toast.success('Cart cleared');
//       setCart(null);
//     } catch (error) {
//       toast.error('Failed to clear cart');
//     }
//   };

//   if (!cart || Object.keys(cart.products).length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
//         Your cart is empty 🛒
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
//         <h1 className="text-2xl font-bold mb-6">🛒 Your Shopping Cart</h1>

//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3 border">Product</th>
//               <th className="p-3 border">Qty</th>
//               <th className="p-3 border">Price</th>
//               <th className="p-3 border">Total</th>
//               <th className="p-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(cart.products).map(([productId, qty]) => (
//               <tr key={productId} className="hover:bg-gray-50">
//                 <td className="p-3 border">
//                   <Link
//                     href={`/product/${productId}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Product #{productId}
//                   </Link>
//                 </td>
//                 <td className="p-3 border">{qty}</td>
//                 <td className="p-3 border">₹100.00</td> {/* Replace with real price */}
//                 <td className="p-3 border">₹{(100 * qty).toFixed(2)}</td>
//                 <td className="p-3 border">
//                   <button
//                     onClick={() => handleRemoveItem(productId)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Footer */}
//         <div className="flex justify-between mt-6">
//           <button
//             onClick={handleClearCart}
//             className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
//           >
//             Clear Cart
//           </button>
//           <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
//             Proceed to Checkout →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
