import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

function HourlyChart() {

  const data = {
    labels: [
      "7a","8a","9a","10a","11a",
      "12p","1p","2p","3p","4p",
      "5p","6p","7p","8p","9p"
    ],

    datasets: [
      {
        data: [1,2,6,12,13,11,9,15,18,15,10,7,4,2,1],
        backgroundColor: "#2957d3",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          Hourly Activity
        </span>

        <span className="card-badge badge-blue">
          Live
        </span>
      </div>

      <Bar
        data={data}
        options={options}
        height={100}
      />
    </div>
  );
}

export default HourlyChart;