'use client';
import { useState, useEffect } from "react";
import { createNewTicket, updateTicketById } from '../../utils/allapi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TicketForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ticket_id: '',
    subject: '',
    status: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('editTicket');
    if (stored) {
      const ticket = JSON.parse(stored);
      setFormData({
        ticket_id: ticket.ticket_id,
        subject: ticket.subject,
        status: ticket.status
      });
      setIsEditMode(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;
      if (isEditMode) {
        // Update mode
        result = await updateTicketById(formData);
      } else {
        // Create mode
        const { ticket_id, ...createData } = formData; // remove ticket_id
        result = await createNewTicket(createData);
      }

      if (result.statusCode === 200 || result.statusCode === 201) {
        toast.success(result.message || 'Success');
        localStorage.removeItem('editTicket');
        router.push('/ticket');
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error(err.message || 'Server error');
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('editTicket');
    router.push('/ticket');
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEditMode ? 'Update Ticket' : 'Create New Ticket'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Enter ticket subject"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
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
          <button type="button" onClick={handleCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
