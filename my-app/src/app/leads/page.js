'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTable, faColumns, faIdCard } from "@fortawesome/free-solid-svg-icons";
import LeadCreationForm from '../createleads/page'; // Ensure this path is correct

export default function Leads() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All Leads');
  const [showCreateLead, setShowCreateLead] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://crm.rajeshcrm.xyz:8000/api/leads/");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError('Failed to load leads. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions = ['All Leads', "Today's Leads", "Yesterday's Leads", "This Week's Leads", "Last Month's Leads"];
  const leadStatuses = ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex">
            <FontAwesomeIcon icon={faIdCard} className="text-blue-500 text-4xl mr-2" />
            <select 
              className="text-lg bg-purple-100 text-purple-800 rounded-md p-2 outline-none"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button onClick={() => setShowCreateLead(true)} className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200">
                <h4>CREATE LEAD <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4" /></h4>
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              <h4>ACTIONS <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4" /></h4>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <input 
            type="search" 
            placeholder="Search leads..." 
            className="w-full lg:w-80 px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 outline-none transition-colors duration-200"
          />

          <div className="flex flex-wrap justify-start lg:justify-center gap-2 mt-4 lg:mt-0">
            {leadStatuses.map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200 transition-colors duration-200"
              >
                {status}
              </motion.button>
            ))}
          </div>

          <div className="flex mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-l-md hover:bg-green-200 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTable} className="mr-2 h-4 w-4" /> TABLE
            </motion.button>
            <Link href="/kanban">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-r-md hover:bg-yellow-200 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faColumns} className="mr-2 h-4 w-4" /> KANBAN
              </motion.button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center text-xl text-gray-600">Loading leads...</div>
        ) : error ? (
          <div className="text-center text-xl text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {['Id','Created On', 'Lead_Status', 'Name', 'Phone', 'Email', 'Course'].map((header) => (
                    <th key={header} className="p-3 text-left text-gray-600">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <motion.tr 
                    key={record.id || index} // Use a unique id from the record if available
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{record.Id}</td>
                    <td className="p-3">{record.Date}</td>
                    <td className="p-3">{record.Lead_Status || '-'}</td>
                    <td className="p-3">{record.Name || '-'}</td>
                    <td className="p-3">{record.Contact_No || '-'}</td>
                    <td className="p-3">{record.Email || '-'}</td>
                    <td className="p-3">{record.Course || '-'}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        
      </motion.div>
      {showCreateLead && (
          <LeadCreationForm setShowCreateLead={setShowCreateLead} />
        )}
    </div>
  );
}
