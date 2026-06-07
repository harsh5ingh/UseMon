import { useEffect, useState } from "react";
import { getUsageData } from "../services/api";
import {
  appIcons,
  DefaultIcon,
} from "../utils/appIcons"

 const appNames = {
  "msedge.exe":"Microsoft Edge",
    "Code.exe":"VS Code",
    "explorer.exe":"File Explorer",
    "chrome.exe":"Chrome",
    "brave.exe":"Brave",
    "WhatsApp.exe":"Whatsapp",
    "SearchHost.exe":"Windows Search",
};

// const appIcons = {
//   "msedge.exe": "🌐",
//   "Code.exe": "💻",
//   "explorer.exe": "📁",
//   "WhatsApp"
// };

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

  const maxSeconds =
      apps.length > 0
      ? apps[0][1]
      : 1;

  return (
    <div className="card">

      <div className="card-header">
        <span className="card-title">
          App Usage Today
        </span>

        <span className="card-meta">
          Total {apps.length} apps
        </span>
      </div>

      {apps.map(([app, seconds]) => {

        const hours =
          Math.floor(seconds / 3600);

        const minutes = 
          Math.floor(
            (seconds % 3600) / 60
          );

        const timeText =
         hours > 0
         ? `${hours}h ${minutes}m`
         : minutes > 0
         ? `${minutes}m`
         : `${Math.floor(seconds)}s`;

        const displayName =
          appNames[app] ||
          app.replace(".exe", "");

        const Icon =
          appIcons[app] || DefaultIcon;

        return (

          <div
            key={app}
            className="app-bar-row"
          >

            <div className="app-icon-box">
              <Icon />
            </div>

            <div className="app-name">
              {displayName}
            </div>

            <div className="bar-track">
              <div
              className="bar-fill"
              style={{
                width: `${(seconds / maxSeconds) * 100}%`,
                background: "var(--blue)"
              }}
              />
            </div>

            <div className="app-time">
              {timeText}
            </div>

          </div>

        );

      })}

    </div>
  );
}

export default AppUsage;