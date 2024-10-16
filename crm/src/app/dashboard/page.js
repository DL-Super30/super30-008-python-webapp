'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faChartLine, faUsers, faUserCheck, faStar, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  "Not Contacted": faUsers,
  "Warm Lead": faStar,
  "Attempted": faUserCheck,
  "Registered": faUserGroup,
  "Opportunity": faChartLine,
  "Cold Lead": faSnowflake
};

const colorMap = {
  "Not Contacted": "text-blue-500",
  "Warm Lead": "text-yellow-500",
  "Attempted": "text-purple-500",
  "Registered": "text-green-500",
  "Opportunity": "text-orange-500",
  "Cold Lead": "text-indigo-500"
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 text-left flex flex-row items-center transition-all duration-300 hover:shadow-xl hover:scale-105">
    <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
      <FontAwesomeIcon icon={icon} className={`${color} text-2xl`}/>
    </div>
    <div className="ml-4">
      <p className={`text-sm ${color}`}>{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

const SimpleLineChart = ({ data }) => {
  const maxValue = Math.max(...data.datasets[0].data);
  const points = data.datasets[0].data.map((value, index) => ({
    x: index * (100 / (data.labels.length - 1)),
    y: 100 - (value / maxValue) * 100
  }));

  const pathD = points.reduce((acc, point, i) => 
    i === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`, 
  '');

  return (
    <div className="w-full h-64 bg-white">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d={pathD} fill="none" stroke="rgb(75, 192, 192)" strokeWidth="2" />
        {points.map((point, i) => (
          <circle key={i} cx={point.x} cy={point.y} r="2" fill="rgb(75, 192, 192)" />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {data.labels.map((label, i) => (
          <span key={i} className="text-xs text-gray-500">{label}</span>
        ))}
      </div>
    </div>
  );
};

const fetchDashboardData = async () => {
  // Simulating API call to fetch data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    stats: [
      { label: "Not Contacted", value: Math.floor(Math.random() * 50) + 10 },
      { label: "Warm Lead", value: Math.floor(Math.random() * 30) + 5 },
      { label: "Attempted", value: Math.floor(Math.random() * 40) + 8 },
      { label: "Registered", value: Math.floor(Math.random() * 60) + 20 },
      { label: "Opportunity", value: Math.floor(Math.random() * 40) + 12 },
      { label: "Cold Lead", value: Math.floor(Math.random() * 20) + 3 },
    ],
    graphData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Leads',
          data: Array.from({length: 6}, () => Math.floor(Math.random() * 100) + 50),
        }
      ]
    }
  };
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchDashboardData();
      setDashboardData(data);
      setIsLoading(false);
    };

    loadData();
    // Refresh data every 5 minutes
    const intervalId = setInterval(loadData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  const totalLeads = dashboardData.stats.reduce((sum, stat) => sum + stat.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Lead Dashboard</h1>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {dashboardData.stats.map((stat, index) => (
          <StatCard 
            key={index} 
            label={stat.label} 
            value={stat.value} 
            icon={iconMap[stat.label]} 
            color={colorMap[stat.label]}
          />
        ))}
      </div>

      {/* Graph and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Graph */}
        <div className="col-span-1 lg:col-span-3 p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Today&s Leads</h2>
          <SimpleLineChart data={dashboardData.graphData} />
        </div>

        {/* Analytics */}
        <div className="p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Total Leads</h2>
          <div className="w-48 h-48 mx-auto relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200 stroke-current" 
                strokeWidth="10" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent"
              ></circle>
              <circle 
                className="text-blue-500  progress-ring__circle stroke-current" 
                strokeWidth="10" 
                strokeLinecap="round" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - totalLeads / 1000)}`}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-700">{totalLeads}</span>
            </div>
          </div>
          <p className="text-center mt-4 text-gray-600">Out of 1000 target</p>
        </div>
      </div>
    </div>
  );
}