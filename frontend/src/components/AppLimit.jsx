function AppLimitsCard() {
  const apps = [
    {
      name: "VS Code",
      used: "38m",
      limit: "120m",
      percent: 32,
    },
    {
      name: "Edge",
      used: "3m",
      limit: "60m",
      percent: 5,
    },
    {
      name: "Chrome",
      used: "45m",
      limit: "90m",
      percent: 50,
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">App Limits</span>
      </div>

      {apps.map((app) => (
        <div key={app.name} className="limit-row">
          <div>
            <div className="limit-app-name">
              {app.name}
            </div>

            <div className="limit-used">
              {app.used} / {app.limit}
            </div>
          </div>

          <div className="limit-bar-wrap">
            <div className="limit-bar-track">
              <div
                className="limit-bar-fill"
                style={{
                  width: `${app.percent}%`,
                  backgroundColor:
                  app.percent >= 50
                  ? "red"
                  : app.percent >= 70
                  ? "orange"
                  : "blue"
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppLimitsCard;