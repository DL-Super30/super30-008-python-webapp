"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faTable, faColumns, faSearch, faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faAngleDown, faTable, faColumns, faSearch, faPlus, faEllipsisV);

const statusColors = {
  'Upcoming': 'bg-blue-500',
  'Ongoing': 'bg-green-500',
  'On Hold': 'bg-yellow-500',
  'Completed': 'bg-purple-500'
};

export default function Learners() {
  const [activeLearnerStatus, setActiveLearnerStatus] = useState(null);
  const [activeView, setActiveView] = useState('Table');
  const [searchTerm, setSearchTerm] = useState('');
  const [learnerCounts, setLearnerCounts] = useState({
    Upcoming: 0,
    Ongoing: 0,
    'On Hold': 0,
    Completed: 0
  });

  useEffect(() => {
    // Simulating API call to get learner counts
    const fetchLearnerCounts = () => {
      setLearnerCounts({
        Upcoming: Math.floor(Math.random() * 50),
        Ongoing: Math.floor(Math.random() * 100),
        'On Hold': Math.floor(Math.random() * 30),
        Completed: Math.floor(Math.random() * 200)
      });
    };

    fetchLearnerCounts();
    const interval = setInterval(fetchLearnerCounts, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleLearnerStatusClick = (status) => {
    setActiveLearnerStatus(status);
    console.log(`Learner status clicked: ${status}`);
  };

  const handleViewClick = (view) => {
    setActiveView(view);
    console.log(`View clicked: ${view}`);
  };

  return (
    <div className="lg:w-full bg-gray-100 min-h-screen ">
      <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
              <div className="flex gap-4 items-center">
                <Image
                  src="/images/employee_contact.2d215fd6.svg"
                  alt="logo"
                  width={44}
                  height={44}
                  className="rounded-full bg-purple-100 p-2"
                />
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  All Learners
                  <FontAwesomeIcon icon={faAngleDown} className="text-purple-500" />
                </h2>
              </div>
              <div className="flex gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center gap-2">
                  <FontAwesomeIcon icon={faPlus} />
                  Create Learner
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow transition duration-300 ease-in-out flex items-center gap-2">
                  Actions
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="flex-grow max-w-md">
                <div className="relative">
                  <input
                    type="search"
                    className="w-full h-10 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Search learners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.entries(learnerCounts).map(([status, count]) => (
                  <button
                    key={status}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out ${
                      activeLearnerStatus === status
                        ? `${statusColors[status]} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleLearnerStatusClick(status)}
                  >
                    {status}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                      activeLearnerStatus === status ? 'bg-white text-gray-800' : statusColors[status]
                    }`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                    activeView === 'Table'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleViewClick('Table')}
                >
                  <FontAwesomeIcon icon={faTable} />
                  Table
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                    activeView === 'Kanban'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => handleViewClick('Kanban')}
                >
                  <FontAwesomeIcon icon={faColumns} />
                  Kanban
                </button>
              </div>
            </div>

            {/* Placeholder for learner data table or kanban board */}
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
              {activeView === 'Table' ? (
                <p>Learner data table will be displayed here</p>
              ) : (
                <p>Learner kanban board will be displayed here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}