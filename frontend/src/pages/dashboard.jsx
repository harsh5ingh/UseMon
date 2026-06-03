import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar.jsx";
import MetricCard from "../components/MetricCard.jsx";
import AppUsage from "../components/AppUsage.jsx"
import "../styles/dashboard.css";

function Dashboard() {

  return(
    <div className="app">

      <Sidebar/>

      <div className="main">

        <Topbar/>

        <div className="content">

          <div className="metrics">

            <MetricCard
              icon="💻"
              label="Screen Time"
              value="0h 0m"
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

          <AppUsage />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;