import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";
import "../styles/loading-screen.css";

const MIN_DISPLAY_MS = 2000;

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), MIN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const ready = !active && minTimePassed;

  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [ready]);

  if (!visible) return null;

  return (
    <div className={`loading-screen${ready ? " fade-out" : ""}`}>
      <img className="loading-screen__logo" src="/rx.svg" alt="RX" />
      <p className="loading-screen__progress">{Math.round(progress)}%</p>
    </div>
  );
}
