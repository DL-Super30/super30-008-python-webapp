// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ counts }) => {
  const data = {
    labels: ['Not Contacted', 'Contacted', 'Warm Lead', 'Cold Lead'],
    datasets: [
      {
        label: 'Lead Counts',
        data: [
          counts.NotContacted,
          counts.Contacted,
          counts.WarmLead,
          counts.ColdLead,
        ],
        fill: false,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
