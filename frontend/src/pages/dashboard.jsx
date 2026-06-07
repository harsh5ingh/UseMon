import {useEffect, useState} from "react";
import {getStats} from "../services/api.js"
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar.jsx";
import MetricCard from "../components/MetricCard.jsx";
import AppUsage from "../components/AppUsage.jsx"
import "../styles/dashboard.css";
import InsightBanner from "../components/InsightBanner.jsx"
import CategoryChart from "../components/CategoryChart.jsx"
import HourlyChart from "../components/HourlyChart.jsx"
import FocusTimer from "../components/FocusTimer.jsx"
import StreakCard from "../components/StreakCard.jsx"
import AppLimit from "../components/AppLimit.jsx"
import FuseTimer from "../components/FuseTimer.jsx"

function Dashboard() {

  const [screenTime, setScreenTime] =
    useState("0m");

  useEffect(() => {
    async function loadStats(){

      const data = await getStats();

      const seconds = data.seconds || 0;

      const hours = Math.floor(seconds / 3600);

      const minutes = Math.floor((seconds % 3600) / 60);

      const timeText =
        hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes}m`;

      setScreenTime(timeText);
    }

      loadStats();

      const interval =
      setInterval(loadStats, 3000);

      return() =>
      clearInterval(interval);

    }, []);


  return(
    <div className="app">

      <Sidebar/>

      <div className="main">

        <Topbar/>

        <div className="content">

            <InsightBanner />

          <div className="metrics">

            <MetricCard
              icon="💻"
              label="Screen Time"
              value={screenTime}
              trend="Live"
              trendClass="trend-neutral"
              bgColor="var(--blue-light)"
            />

            <MetricCard
              icon="📱"
              label="Pickups"
              value="0"
              trend="Coming Soon"
              trendClass="trend-neutral"
              bgColor="var(--amber-light)"
            />

            <MetricCard
              icon="🎯"
              label="Focus Time"
              value="0m"
              trend="Coming Soon"
              trendClass="trend-neutral"
              bgColor="var(--green-light)"
            />

            <MetricCard
              icon="🔔"
              label="Notifications"
              value="0"
              trend="Coming Soon"
              trendClass="trend-neutral"
              bgColor="var(--red-light)"
            />

          </div>

       <div className="row2">
          <AppUsage />
          <CategoryChart />
          </div>

      <div className="row-full">
        <HourlyChart />
      </div>

      <div className="row3">
        <FuseTimer />
        <StreakCard />
        <AppLimit />
      </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;