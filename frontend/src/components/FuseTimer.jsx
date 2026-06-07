import { useRef, useEffect, useState } from "react";
import FuseRenderer from "../effects/fuse/FuseRenderer";

function FuseTimer() {

  const canvasRef = useRef(null);

  const TOTAL_SECONDS = 25 * 60;

  const [seconds, setSeconds] =
    useState(TOTAL_SECONDS);

  const [running, setRunning] =
    useState(false);

  const rendererRef =
    useRef(null);

  const animationRef =
    useRef(null);

  // Create renderer once

  useEffect(() => {

    const canvas =
      canvasRef.current;

    canvas.width = 300;
    canvas.height = 300;

    rendererRef.current =
      new FuseRenderer(canvas);

    function animate() {

      const progress =
        seconds / TOTAL_SECONDS;

      rendererRef.current.draw(
        progress
      );

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    }

    animate();

    return () => {

      cancelAnimationFrame(
        animationRef.current
      );

    };

  }, []);

  // Timer logic

  useEffect(() => {

    let interval;

    if (
      running &&
      seconds > 0
    ) {

      interval =
        setInterval(() => {

          setSeconds(prev =>
            prev - 1
          );

        }, 1000);

    }

    return () =>
      clearInterval(interval);

  }, [running, seconds]);

  const minutes =
    String(
      Math.floor(
        seconds / 60
      )
    ).padStart(2, "0");

  const secs =
    String(
      seconds % 60
    ).padStart(2, "0");

  function handleReset() {

    setRunning(false);

    setSeconds(
      TOTAL_SECONDS
    );

  }

  return (

    <div className="card">

      <div className="card-header">

        <span className="card-title">
          Focus Session
        </span>

      </div>

      <div className="fuse-wrapper">

        <canvas
          ref={canvasRef}
        />

        <div className="fuse-time">
          {minutes}:{secs}
        </div>

      </div>

      <div className="timer-sub">
        Pomodoro • Focus Mode
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >

        {!running ? (

          <button
            className="btn btn-blue"
            onClick={() =>
              setRunning(true)
            }
          >
            Start Focus
          </button>

        ) : (

          <button
            className="btn btn-red"
            onClick={() =>
              setRunning(false)
            }
          >
            Pause
          </button>

        )}

        <button
          className="btn"
          onClick={handleReset}
        >
          Reset
        </button>

      </div>

    </div>

  );
}

export default FuseTimer;