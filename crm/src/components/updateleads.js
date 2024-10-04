import { useState } from 'react';

export default function UpdateLeadForm({ lead, onClose, onUpdate }) {
  const [updatedLead, setUpdatedLead] = useState(lead);
  const [error, setError] = useState(null); // State to track error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLead(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await fetch(`http://18.224.180.46:8000/api/leads/${updatedLead.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLead),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      onUpdate(updatedLead);
      onClose();
    } catch (error) {
      console.error('Error updating lead:', error);
      setError(error.message); // Set error message to display
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[100vh] flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Update Lead</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={updatedLead.Name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="Contact_No"
              name="Phone"
              value={updatedLead.Contact_No}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Lead_Status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="Lead_Status"
              name="Lead_Status"
              value={updatedLead.Lead_Status} // Ensure case matches updatedLead
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option>-Select-</option>
              <option value="Not Contacted">Not Contacted</option>
              <option value="Attempted">Attempted</option>
              <option value="Warm Lead">Warm Lead</option>
              <option value="Cold Lead">Cold Lead</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="Stack" className="block text-sm font-medium text-gray-700">Stack</label>
            <input
              type="text"
              id="Tech_Stack"
              name="Tech_Stack"
              value={updatedLead.Tech_Stack}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Course" className="block text-sm font-medium text-gray-700">Course</label>
            <input
              type="text"
              id="Course"
              name="Course"
              value={updatedLead.Course}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Datetime" className="block text-sm font-medium text-gray-700">Created on</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={updatedLead.Date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
