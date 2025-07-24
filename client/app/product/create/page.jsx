'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createNewProduct } from '../../utils/allapi';
import { useRouter } from 'next/navigation';

const CreateProductPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '', desc: '', image_url: '', stock: '', price: '', sell_price: '', rating: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const ratingValue = formData.rating.trim() === '' ? 0 : parseFloat(formData.rating);

    if (ratingValue < 0 || ratingValue > 5) {
      toast.error('❌ Rating must be between 0 and 5');
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      desc: formData.desc,
      image_url: formData.image_url,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price),
      sell_price: parseFloat(formData.sell_price || 0),
      rating: ratingValue,
    };

    try {
      const data = await createNewProduct(payload);

      if (data.statusCode !== 201) throw new Error(data.message || 'Failed to create product');

      toast.success('✅ Product created successfully!');
      setFormData({
        name: '',
        desc: '',
        image_url: '',
        stock: '',
        price: '',
        sell_price: '',
        rating: '',
      });
      router.push('/product');
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md animate-fadeIn"
      >
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
          placeholder="Sell Price (optional)"
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
          placeholder="Rating (0–5, optional)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-blue-400"
        />


        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded transition duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
