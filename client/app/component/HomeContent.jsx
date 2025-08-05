'use client';
import { useEffect, useState } from 'react';
import { fetchHomeDashboardData } from './Api/HomeApi';
import { FaArrowUp } from 'react-icons/fa';

const statusColors = {
  'Draft': 'bg-gray-400',
  'Pending': 'bg-blue-500',
  'Not Paid': 'bg-yellow-400',
  'Overdue': 'bg-red-500',
  'Partially Paid': 'bg-cyan-400',
  'Paid': 'bg-green-500'
};

const ProgressSection = ({ label, data }) => (
  <div className="bg-white rounded-xl shadow p-6 border">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">{label}</h3>
    <div className="space-y-4">
      {data.map((item, index) => {
        const barColor = statusColors[item.title] || 'bg-gray-300';
        return (
          <div key={index}>
            <div className="flex justify-between mb-1 text-sm text-gray-600">
              <span>{item.title}</span>
              <span>{item.amount}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${barColor} h-2.5 rounded-full`}
                style={{ width: `${item.amount}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function Home() {
  const [data, setData] = useState({ leadStats: [], invoice: [], quote: [], offer: [] });

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchHomeDashboardData();
      setData(res);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {data.leadStats.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>
              <p className="text-sm text-gray-500 mt-2">This Month</p>
              <p className="text-2xl font-bold text-indigo-600">
                ${item.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Previews in 1 line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressSection label="Invoice Preview" data={data.invoice} />
          <ProgressSection label="Quote Preview" data={data.quote} />
          <ProgressSection label="Offer Preview" data={data.offer} />

          {/* Customer Preview */}
          <div className="bg-white rounded-xl shadow p-6 border">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Customer Preview</h3>
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90" width="100" height="100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb" 
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#22c55e"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={(1 - 0.25) * 251.2} // 25% fill
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
                25%
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">New Customers this month</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Customers</p>
                <div className="flex items-center gap-2 text-green-600 font-medium mt-1">
                  <FaArrowUp />
                  <span>11.25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
