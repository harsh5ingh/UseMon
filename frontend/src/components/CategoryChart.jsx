import {useEffect, useState} from "react"
import {getUsageData} from "../services/api"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function CategoryChart() {

  const categories = {
  "Code.exe": "Development",
  "chrome.exe": "Browser",
  "msedge.exe": "Browser",
  "brave.exe": "Browser",
  "WhatsApp.exe": "Communication",
  "explorer.exe": "System",
  "SearchHost.exe": "System",
};

const [chartData, setChartData] = useState({
  Development: 0,
  Browser: 0,
  Communication: 0,
  System: 0,
});

useEffect(() => {

  async function load() {

    const usage = await getUsageData();

    const totals = {
      Development: 0,
      Browser: 0,
      Communication: 0,
      System: 0,
    };

    Object.entries(usage).forEach(
      ([app, seconds]) => {

        const category =
          categories[app] || "System";

        totals[category] += seconds;
      }
    );

    setChartData(totals);
  }

  load();

  const interval =
    setInterval(load, 3000);

  return () =>
    clearInterval(interval);

}, []);


const data = {
  labels: [
    "Development",
    "Browser",
    "Communication",
    "System",
  ],

  datasets: [
    {
      data: [
        chartData.Development,
        chartData.Browser,
        chartData.Communication,
        chartData.System,
      ],

      backgroundColor: [
        "#2563eb",
        "#22c55e",
        "#f59e0b",
        "#64748b",
      ],

      borderWidth: 0,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: "right",

      labels: {
        color: "#9ca3af",
        padding: 18,
      },
    },
  },

  cutout: "70%",
};

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          Time by Category
        </span>
      </div>

      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}

export default CategoryChart;