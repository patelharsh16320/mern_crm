'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image_url: '',
    stock: '',
    price: '',
    sell_price: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/create-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create product');

      toast.success('Product created successfully!');
      setFormData({
        name: '',
        desc: '',
        image_url: '',
        stock: '',
        price: '',
        sell_price: '',
        rating: '',
      });
    } catch (error) {
      toast.error(error.message || 'Error creating product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md animate-fadeIn">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
          required
        />
        <textarea
          name="desc"
          placeholder="Product Description"
          value={formData.desc}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
          rows="3"
          required
        />
        <input
          type="url"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
          required
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Original Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
          required
        />
        <input
          type="number"
          step="0.01"
          name="sell_price"
          placeholder="Sell Price"
          value={formData.sell_price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
        />
        <input
          type="number"
          step="0.1"
          max="5"
          min="0"
          name="rating"
          placeholder="Rating (e.g. 4.5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
