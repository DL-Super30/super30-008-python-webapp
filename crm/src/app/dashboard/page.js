'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserGroup } from '@fortawesome/free-solid-svg-icons';
const stats = [
  { label: "Not Contacted", value: 10 },
  { label: "Warm Lead", value: 5 },
  { label: "Attempted", value: 8 },
  { label: "Registered", value: 20 },
  { label: "Opportunity", value: 12 },
  { label: "Cold Lead", value: 3 },
];
const StatCard = ({ image, label, value }) => (
  <div className="bg-white shadow-md rounded-lg p-4 text-left flex flex-row align-middle">
    <div className="p-2 mt-2 border-2 rounded-full h-10 w-10">
    <p><FontAwesomeIcon icon={faUserGroup} className='text-blue-500 text-center text-lg'/></p>
    </div>
    <div className="ml-2">
      <p className="text-sm text-red-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="h-auto bg-gray-100 p-4 md:p-8">
      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} image="/images/3users.svg" label={stat.label} value={stat.value} />
        ))}
      </div>
      {/* Graph and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Graph */}
        <div className="col-span-1 lg:col-span-3 p-4 md:p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-medium mb-4 text-center">Today Leads</h2>
          {/* Placeholder for Graph */}
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Graph goes here</p>
          </div>
        </div>
        {/* Analytics */}
        <div className="p-4 md:p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-medium mb-4 text-center">Analytics</h2>
          <div className="w-36 md:w-48 h-36 md:h-48 border-[1px] mx-auto border-black rounded-full flex items-center justify-center">
            <p>582 Leads</p>
          </div>
        </div>
      </div>
    </div>
  );
}
