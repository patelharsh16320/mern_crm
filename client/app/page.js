'use client';
import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllTicket } from './(api)/utils/showAllData';
import { toast } from 'react-toastify';

const Page = () => {
  const [stats, setStats] = useState({
    users: 0,
    tickets: 0,
    inProgress: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const userRes = await fetchAllUsers();
        const ticketRes = await fetchAllTicket();
        const tickets = ticketRes?.users || [];

        setStats({
          users: userRes?.users?.length || 0,
          tickets: tickets.length,
          inProgress: tickets.filter(t => t.status === 'in_progress').length,
        });

        toast.success('Data loaded successfully');
      } catch (err) {
        toast.error('Failed to load data');
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">📊 Dashboard Overview</h1>
          <p className="text-sm text-gray-500">Your system statistics at a glance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard label="Total Clients" count={stats.users} icon="👥" />
          <StatCard label="Total Tickets" count={stats.tickets} icon="🎫" />
          <StatCard label="In Progress Tickets" count={stats.inProgress} icon="⏳" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, count, icon }) => (
  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow hover:shadow-md transition-all">
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-2xl font-bold text-blue-700">{count}</p>
  </div>
);

export default Page;
