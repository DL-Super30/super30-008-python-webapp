import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all necessary components

const PieChart = ({ counts }) => {
  const data = {
    labels: ['Not Contacted', 'Contacted', 'Warm Lead', 'Cold Lead'],
    datasets: [
      {
        data: [
          counts.NotContacted,
          counts.Contacted,
          counts.WarmLead,
          counts.ColdLead,
        ],
        backgroundColor: ['#3b82f6', '#34d399', '#ec4899', '#f43f5e'],
      },
    ],
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
