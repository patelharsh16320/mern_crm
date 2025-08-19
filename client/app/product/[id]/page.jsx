'use client';
import React, { useEffect, useState, useRef } from 'react';
import { fetchProductById } from '../../(api)/utils/showAllData';
import { createCart, updateCart } from '../../(api)/utils/allapi';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import gsap from 'gsap';

const DetailRow = ({ label, value, bold }) => (
  <div className="flex justify-between py-2 border-b border-gray-200">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className={`text-gray-800 ${bold ? 'font-bold text-lg text-green-600' : ''}`}>
      {value}
    </span>
  </div>
);

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);

  // ✅ Fetch Product
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        toast.success('Product loaded successfully');
      } catch (err) {
        console.error(err);
        toast.error('Failed to load product');
      }
    })();
  }, [id]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // ✅ GSAP animation
  useEffect(() => {
    if (!product) return;
    gsap.fromTo(pageRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 });
    gsap.from(headerRef.current, { y: -50, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from(imageRef.current, { scale: 0.9, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.3 });
    gsap.from(detailsRef.current, { x: 40, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.4 });
  }, [product]);

  // ✅ Add to Cart Function
  const addToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.user_id;
      if (!userId) return toast.error('User not logged in');

      let updatedCart = [...cart];
      const index = updatedCart.findIndex(i => i.product_id === product.product_id);
      index !== -1 ? updatedCart[index].qty++ : updatedCart.push({ product_id: product.product_id, qty: 1 });

      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success(`${product.name} added to cart`);

      const cartId = localStorage.getItem('cart_id');
      const payload = { user_id: userId, products_qty: updatedCart };
      const res = cartId ? await updateCart(payload) : await createCart(payload);
      if (!cartId && res.cart_id) localStorage.setItem('cart_id', res.cart_id);
    } catch (err) {
      toast.error('Error adding to cart');
    }
  };

  if (!product) return <div className="text-center py-20 text-gray-500">Loading product...</div>;

  const { name, desc, price, sell_price, stock, rating, image_url, created_at, modified_at } = product;

  const productDetails = [
    { label: "Name", value: name },
    { label: "Description", value: desc },
    { label: "Price", value: `₹${price}` },
    ...(Number(sell_price) > 0 ? [{ label: "Sell Price", value: `₹${sell_price}`, bold: true }] : []),
    { label: "Stock", value: stock },
    { label: "Rating", value: `${rating} ⭐` },
    { label: "Created At", value: new Date(created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) },
    { label: "Modified At", value: new Date(modified_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📦 {name}</h1>
          <p className="text-gray-500">Detailed view of this product</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Product Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <img
            ref={imageRef}
            src={image_url}
            alt={name}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div ref={detailsRef} className="bg-white p-6 rounded-2xl shadow space-y-3">
          {productDetails.map((item, i) => (
            <DetailRow key={i} {...item} />
          ))}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              🛒 Add to Cart
            </button>
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold">
              💳 Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
