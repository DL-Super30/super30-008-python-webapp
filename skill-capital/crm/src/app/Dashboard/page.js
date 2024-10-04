'use client'
import React, { useEffect, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { Card, CardContent } from '@mui/material';
import DoughnutChart from '../Dashboard/DoughnutChart';
import LineChart from '../Dashboard/LineChart';
import { parseISO, isToday, getHours } from 'date-fns';
import axios from 'axios';

const leadStatuses = ["Not Contacted", "Attempted", "Warm Lead", "Cold Lead","Total"];

const statusKeyMap = {
  "Not Contacted": "NotContacted",
  "Attempted": "Attempted",
  "Warm Lead": "WarmLead",
  "Cold Lead": "ColdLead",
  "Total":"Total",
};

const calculateCounts = (leads) => {
  const counts = {
 
    NotContacted: leads.filter(lead => lead.lead_status === "Not Contacted").length,
    Attempted: leads.filter(lead => lead.lead_status === "Attempted").length,
    WarmLead: leads.filter(lead => lead.lead_status === "Warm Lead").length,
    ColdLead: leads.filter(lead => lead.lead_status === "Cold Lead").length,
  };
  counts.Total= counts.NotContacted+ counts.Attempted + counts.WarmLead + counts.ColdLead;
  return counts;
};

const generateHourlyCounts = (leads) => {
  const hourlyCounts = new Array(24).fill(0);
  leads.forEach(lead => {
    const leadDate = parseISO(lead.date);
    if (isToday(leadDate)) {
      const hour = getHours(leadDate);
      hourlyCounts[hour] += 1; // Increment the count for that hour
    }
  });
  return hourlyCounts;
};

export default function Dashboard() {
  const [counts, setCounts] = useState({
    NotContacted: 0,
   Attempted: 0,
    WarmLead: 0,
    ColdLead: 0,
    Total:0,
  });
  const [todayCounts, setTodayCounts] = useState({
    NotContacted: 0,
    Attempted: 0,
    WarmLead: 0,
    ColdLead: 0,
    Total:0,
  });
  const [previousCounts, setPreviousCounts] = useState({
    NotContacted: 0,
    Attempted: 0,
    WarmLead: 0,
    ColdLead: 0,
    Total:0,
  });
  const [hourlyTodayCounts, setHourlyTodayCounts] = useState(new Array(24).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsApiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${leadsApiUrl}/leads/`);
        const data = await response.data;

        // All leads counts
        setCounts(calculateCounts(data));

        // Today's and previous leads
        const todayLeads = [];
        const previousLeads = [];

        data.forEach((lead) => {
          const leadDate = parseISO(lead.date);
          if (isToday(leadDate)) {
            todayLeads.push(lead);
          } else {
            previousLeads.push(lead);
          }
        });

        setTodayCounts(calculateCounts(todayLeads));
        setPreviousCounts(calculateCounts(previousLeads));

        // Generate hourly counts for today's leads
        setHourlyTodayCounts(generateHourlyCounts(data));
      } catch (error) {
        console.log('Fetching error:', error);
      }
    };

    fetchData();
  }, []);

  const colorChange = (status) => {
    switch (status) {
      case "Not Contacted":
        return "bg-blue-100 border-t-blue-500";
      case "Attempted":
        return "bg-green-100 border-t-green-500";
      case "Warm Lead":
        return "bg-pink-100 border-t-pink-500";
      case "Cold Lead":
        return "bg-rose-100 border-t-rose-500";
      case "Total":
        return "bg-orange-100 border-t-orange-500";
      default:
        return "";
    }
  };

  return (
    <section className="bg-gray-100 py-6" aria-label="Lead status overview">
      {/* Lead status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 sm:grid-cols-4 gap-2">
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

      <div className="w-full flex items-center justify-between py-4">
        {/* Line chart for today's leads count by hour */}
        <div className="w-1/3 h-fit bg-white border-1 rounded-md z-1">
          <LineChart hourlyCounts={hourlyTodayCounts} />
        </div>

        {/* Doughnut chart for status-based distribution */}
        <div className="w-1/3 h-fit bg-white border-1 rounded-md z-1">
          <h2 className='capitalize text-center'>today&apos;s & Previous Leads</h2>
          <DoughnutChart counts={counts} todayCounts={todayCounts} previousCounts={previousCounts} />
        </div>
      </div>
    </section>
  );
}
