function StreakCard() {

  const days = [
    { day: 1, icon: "🔥" },
    { day: 2, icon: "🔥" },
    { day: 3, icon: "🔥" },
    { day: 4, icon: "🔥" },
    { day: 5, icon: "🔥" },
    { day: 6, icon: "🔥" },
    { day: 7, icon: "💣" },

    { day: 8, icon: "" },
    { day: 9, icon: "😭" },
    { day: 10, icon: "🔥" },
    { day: 11, icon: "🔥" },
    { day: 12, icon: "🔥" },
    { day: 13, icon: "🔥" },
    { day: 14, icon: "" },
  ];

  return (
    <div className="card">

      <div className="card-header">
        <span className="card-title">
          Mindful Streak
        </span>

        <span className="card-badge badge-green">
          4 days
        </span>
      </div>

      <div className="calendar-header">
        <button>{"<"}</button>

        <span>June</span>

        <button>{">"}</button>
      </div>

      <div className="weekdays">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </div>

      <div className="calendar-grid">
        {days.map((item) => (
          <div
            key={item.day}
            className="calendar-day"
          >
            <div className="streak-icon">
              {item.icon}
            </div>

            <div className="day-number">
              {item.day}
            </div>
          </div>
        ))}
      </div>

      <div className="streak-footer">

        <div className="streak-stat">
          Current 🔥 4
        </div>

        <div className="streak-stat">
          Best 🔥 12
        </div>

      </div>

    </div>
  );
}

export default StreakCard;