'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTable, faColumns, faIdCard } from "@fortawesome/free-solid-svg-icons";
import LeadCreationForm from '../createleads/page';
import KanbanLeads from '../kanban/page';

export default function EnhancedLeads() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All Leads');
  const [selectedLeadStatus, setSelectedLeadStatus] = useState('All');
  const [showCreateLead, setShowCreateLead] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRecords();
  }, [records, selectedStatus, selectedLeadStatus, searchTerm]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://20.205.130.55:8000/api/leads/");
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

  const filterRecords = () => {
    let filtered = [...records];

    // Filter by selected status
    if (selectedStatus !== 'All Leads') {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay());
      const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      filtered = filtered.filter(record => {
        const recordDate = new Date(record.Date);
        switch (selectedStatus) {
          case "Today's Leads":
            return recordDate.toDateString() === today.toDateString();
          case "Yesterday's Leads":
            return recordDate.toDateString() === yesterday.toDateString();
          case "This Week's Leads":
            return recordDate >= thisWeekStart;
          case "Last Month's Leads":
            return recordDate >= lastMonthStart && recordDate < new Date(today.getFullYear(), today.getMonth(), 1);
          default:
            return true;
        }
      });
    }

    // Filter by lead status
    if (selectedLeadStatus !== 'All') {
      filtered = filtered.filter(record => record.Lead_Status === selectedLeadStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(record =>
        Object.values(record).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredRecords(filtered);
  };

  const statusOptions = ['All Leads', "Today's Leads", "Yesterday's Leads", "This Week's Leads", "Last Month's Leads"];
  const leadStatuses = ['All', 'Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="w-full flex justify-between flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
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
            <div className="flex gap-x-4">
            <button onClick={() => setShowCreateLead(true)} className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200  ml-[50px]">
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
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <input 
            type="search" 
            placeholder="Search leads..." 
            className="w-full lg:w-80 px-4 py-2 rounded-lg border-2 border-purple-200 focus:border-purple-500 outline-none transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap justify-start lg:justify-center gap-2 mt-4 lg:mt-0">
            {leadStatuses.map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  selectedLeadStatus === status
                    ? 'bg-indigo-500 text-white'
                    : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
                onClick={() => setSelectedLeadStatus(status)}
              >
                {status}
              </motion.button>
            ))}
          </div>

          <div className="flex mt-4 lg:mt-0">
            <motion.button
              onClick={() => setShowKanban(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center px-4 py-2 rounded-l-md transition-colors duration-200 ${
                !showKanban ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              <FontAwesomeIcon icon={faTable} className="mr-2 h-4 w-4" /> TABLE
            </motion.button>
            <motion.button
              onClick={() => setShowKanban(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center px-4 py-2 rounded-r-md transition-colors duration-200 ${
                showKanban ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              }`}
            >
              <FontAwesomeIcon icon={faColumns} className="mr-2 h-4 w-4" /> KANBAN
            </motion.button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center text-xl text-gray-600">Loading leads...</div>
        ) : error ? (
          <div className="text-center text-xl text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            {!showKanban && (
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    {['Created On', 'Lead Status', 'Name', 'Phone', 'Email', 'Course'].map((header) => (
                      <th key={header} className="p-3 text-left text-gray-600">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <motion.tr 
                      key={record.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b hover:bg-gray-50"
                    >
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
            )}
          </div>
        )}
      </motion.div>
      {showCreateLead && (
        <LeadCreationForm setShowCreateLead={setShowCreateLead} />
      )}
      {showKanban && (<KanbanLeads />)}
    </div>
  );
}