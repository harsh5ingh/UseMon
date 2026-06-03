import { useEffect, useState } from "react";
import { getUsageData } from "../services/api";

const appNames = {
  "msedge.exe":"Microsoft Edge",
    "Code.exe":"VS Code",
    "explorer.exe":"File Explorer",
    "chrome.exe":"Chrome",
    "brave.exe":"Brave",
};

const appIcons = {
  "msedge.exe": "🌐",
  "Code.exe": "💻",
  "explorer.exe": "📁",
};

function AppUsage() {

  const [apps, setApps] = useState([]);

  useEffect(() => {

    async function load() {

      const data = await getUsageData();

      const entries =
        Object.entries(data);

      entries.sort(
        (a, b) => b[1] - a[1]
      );

      setApps(entries);
    }

    load();

    const interval =
      setInterval(load, 2000);

    return () =>
      clearInterval(interval);

  

  }, []);

  return (
    <div className="card">

      <div className="card-header">
        <span className="card-title">
          App Usage Today
        </span>
      </div>

      {apps.map(([app, seconds]) => {

        const minutes =
          Math.floor(seconds / 60);

        const displayName =
          appNames[app] || app;

        const icon =
          appIcons[app] || "🖥️";

        return (

          <div
            key={app}
            className="app-bar-row"
          >

            <div>
              {icon}
            </div>

            <div className="app-name">
              {displayName}
            </div>

            <div className="app-time">
              {minutes}m
            </div>

          </div>

        );

      })}

    </div>
  );
}

export default AppUsage;