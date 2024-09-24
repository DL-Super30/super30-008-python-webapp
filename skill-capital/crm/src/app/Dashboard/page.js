'use client';
import React, { useEffect, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People'; // Material-UI icon for Users
import { Card, CardContent } from '@mui/material';
import DoughnutChart from '../Dashboard/DoughnutChart';
import LineChart from '../Dashboard/LineChart';

const leadStatuses = ["Not Contacted", "Contacted", "Warm Lead", "Cold Lead"];

const statusKeyMap = {
  "Not Contacted": "NotContacted",
  "Contacted": "Contacted",
  "Warm Lead": "WarmLead",
  "Cold Lead": "ColdLead",
};

const colorChange = (status) => {
  switch (status) {
    case "Not Contacted":
      return "bg-blue-100 border-t-blue-500";
    case "Contacted":
      return "bg-green-100 border-t-green-500";
    case "Warm Lead":
      return "bg-pink-100 border-t-pink-500";
    case "Cold Lead":
      return "bg-rose-100 border-t-rose-500";
    default:
      return "";
  }
};

export default function Dashboard() {
  const [counts, setCounts] = useState({
    NotContacted: 0,
    Contacted: 0,
    WarmLead: 0,
    ColdLead: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsApiUrl = process.env.NEXT_PUBLIC_LEADS_API_URL;
        const response = await fetch(leadsApiUrl, {
          method: 'GET',
        });
        const data = await response.json();

        const updatedCounts = {
          NotContacted: data.filter(lead => lead.lead_status === "Not Contacted").length,
          Contacted: data.filter(lead => lead.lead_status === "Contacted").length,
          WarmLead: data.filter(lead => lead.lead_status === "Warm Lead").length,
          ColdLead: data.filter(lead => lead.lead_status === "Cold Lead").length,
        };

        setCounts(updatedCounts);
      } catch (error) {
        console.log('Fetching error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-100 py-6" aria-label="Lead status overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-4 gap-2">
        {leadStatuses.map((status) => (
          <Card key={status} className={`border-t-4 ${colorChange(status)}`}>
            <CardContent className="flex items-center p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <PeopleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{status}</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {counts[statusKeyMap[status]] ?? 0}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='w-full flex items-center justify-around py-4'>

        <div className='w-1/3 h-fit bg-white border-1 rounded-md z-1'>
        <LineChart counts={counts} className="w-[90px]"/>
        </div>
      
      <div className='w-1/3 h-fit bg-white border-1 rounded-md z-1'>
      <DoughnutChart counts={counts}  className="w-full"/>
      </div>
    
      </div>
    </section>
  );
}
