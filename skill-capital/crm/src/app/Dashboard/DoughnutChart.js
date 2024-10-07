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
        backgroundColor: ['rgb(210, 224, 251)', 'rgb(254, 249, 217)', 'rgb(222, 229, 212)', 'rgb(142, 172, 205)'],
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
        backgroundColor: ['rgb(245, 245, 245)', 'rgb(72, 207, 203)', 'rgb(34, 151, 153)', 'rgb(184, 0, 31)'],
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
