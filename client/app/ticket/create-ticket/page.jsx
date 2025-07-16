'use client';
import { useState, useEffect } from "react";
import { updateTicketById } from '../../utils/allapi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CreateTicket() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ticket_id: '',
    subject: '',
    status: ''
  });

  // On edit mode load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('editTicket');
    if (stored) {
      const ticket = JSON.parse(stored);
      setFormData({
        ticket_id: ticket.ticket_id,
        subject: ticket.subject,
        status: ticket.status
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateTicketById(formData);
      toast.success(result.message);
      localStorage.removeItem('editTicket');
      router.push('/ticket');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({ ticket_id: '', subject: '', status: '' });
    localStorage.removeItem('editTicket');
    router.push('/ticket');
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Update Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          >
            <option value="">Select status</option>
            <option value="backlog">Backlog</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="on_hold">On Hold</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={handleCancel} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Update</button>
        </div>
      </form>
    </div>
  );
}
