'use client';
import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllTicket } from './(api)/utils/showAllData';
import { toast } from 'react-toastify';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import HomeContent from './component/HomeContent';
ChartJS.register(ArcElement, Tooltip, Legend);

const Page = () => {
  const [stats, setStats] = useState({
    users: 0,
    tickets: 0,
    inProgress: 0,
  });

  const [ticketStatusCounts, setTicketStatusCounts] = useState({});

  useEffect(() => {
    const loadStats = async () => {
      try {
        const userRes = await fetchAllUsers();
        const ticketRes = await fetchAllTicket();
        const tickets = ticketRes?.users || [];

        // Count statuses
        const statusMap = {
          backlog: 0,
          to_do: 0,
          in_progress: 0,
          on_hold: 0,
          review: 0,
          done: 0,
        };

        tickets.forEach(ticket => {
          const status = ticket.status;
          if (statusMap.hasOwnProperty(status)) {
            statusMap[status]++;
          }
        });

        setTicketStatusCounts(statusMap);

        setStats({
          users: userRes?.users?.length || 0,
          tickets: tickets.length,
          inProgress: statusMap.in_progress || 0,
        });

        toast.success('Data loaded successfully');
      } catch (err) {
        console.error('Loading error:', err);
        toast.error('Failed to load data');
      }
    };

    loadStats();
  }, []);

  return (
    <>
      <HomeContent />
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
          <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-center">Ticket Status Chart</h2>
            <Doughnut
              data={{
                labels: Object.keys(ticketStatusCounts),
                datasets: [{
                  label: 'Ticket Status',
                  data: Object.values(ticketStatusCounts),
                  backgroundColor: [
                    '#9CA3AF', // backlog - gray
                    '#FBBF24', // to_do - yellow
                    '#60A5FA', // in_progress - blue
                    '#F87171', // on_hold - red
                    '#FCD34D', // review - orange
                    '#34D399', // done - green
                  ],
                  borderColor: '#fff',
                  borderWidth: 2,
                }],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
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
