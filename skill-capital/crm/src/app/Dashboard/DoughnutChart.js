'use client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DoughnutChart = ({ todayCounts, previousCounts }) => {
  const labels = ['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'];

  const data = {
    labels,
    datasets: [
      {
        label: "Today's Leads",
        data: [
          todayCounts.NotContacted, 
          todayCounts.Attempted,
          todayCounts.WarmLead,
          todayCounts.ColdLead,
        ],
        backgroundColor: ['#3b82f6', '#34d399', '#ec4899', '#f43f5e'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
      {
        label: 'Previous Leads',
        data: [
          previousCounts.NotContacted,
          previousCounts.Attempted,
          previousCounts.WarmLead,
          previousCounts.ColdLead,
        ],
        backgroundColor: ['#60a5fa', '#6ee7b7', '#f472b6', '#fb7185'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label || '';
            const value = tooltipItem.raw || 0;
            const total = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex].data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${datasetLabel}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-80">
      {(!todayCounts || !previousCounts) ? (
        <p>No data available for the chart.</p>
      ) : (
        <Doughnut data={data} options={options} />
      )}
    </div>
  );
};

export default DoughnutChart;
