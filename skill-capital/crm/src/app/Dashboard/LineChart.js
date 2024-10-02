'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Function to generate hour labels
const generateHourLabels = () => {
  return Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
};

const LineChart = ({ hourlyCounts }) => {
  const DATA_COUNT = 24; // Total number of hours in a day

  // Validate that we have 24 entries, otherwise fill with 0
  const validTodayCounts = Array.isArray(hourlyCounts) && hourlyCounts.length === DATA_COUNT 
    ? hourlyCounts 
    : new Array(DATA_COUNT).fill(0);

  // Calculate max count for dynamic y-axis scaling
  const maxCount = Math.max(...validTodayCounts, 10);

  // Prepare labels for x-axis (hours)
  const labels = generateHourLabels();

  // Prepare datasets for today's counts
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Today's Leads",
        data: validTodayCounts,
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area color
        fill: true,
        tension: 0.1,
      }
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of Day (24 Hours)',
        },
        ticks: {
          autoSkip: false, // Show all labels for 24 hours
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Leads',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          suggestedMax: maxCount + 1, // Dynamically adjust based on data
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className='w-[780px] text-sm'>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
