import { useEffect, useState } from "react";

function FocusTimer() {

  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running && seconds > 0) {

      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);

    }

    return () => clearInterval(interval);

  }, [running, seconds]);

  const minutes =
    String(Math.floor(seconds / 60))
      .padStart(2, "0");

  const secs =
    String(seconds % 60)
      .padStart(2, "0");

  function handleReset() {
    setRunning(false);
    setSeconds(25 * 60);
  }

  const radius = 60;

  const circumference = 
      2 * Math.PI * radius;
      
  const progress =
   (seconds/ (25 * 60));

  return (
    <div className="card">

      <div className="card-header">
        <span className="card-title">
          Focus Session
        </span>
      </div>

      <div className="timer-center">

        <div className="timer-ring">

  <svg
    width="150"
    height="150"
    className="timer-svg"
  >

    <circle
      cx="75"
      cy="75"
      r={radius}
      stroke="#2a2a2a"
      strokeWidth="10"
      fill="none"
    />

    <circle
      cx="75"
      cy="75"
      r={radius}
      stroke="#2563eb"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={
        circumference - progress
      }
      transform="rotate(-90 75 75)"
    />

  </svg>

  <div className="timer-overlay">
    <div className="timer-big">
      {minutes}:{secs}
    </div>
  </div>

</div>

        <div className="timer-sub">
          Pomodoro • Focus Mode
        </div>

        {!running ? (
          <button
            className="btn btn-blue"
            onClick={() => {
              console.log("clicked");
              setRunning(true)
              
            }}
          >
            Start Focus
          </button>
        ) : (
          <button
            className="btn btn-red"
            onClick={() => setRunning(false)}
          >
            Pause
          </button>
        )}

        <button
          className="btn"
          style={{ marginLeft: "10px" }}
          onClick={handleReset}
        >
          Reset
        </button>

      </div>

    </div>
  );
}

export default FocusTimer;