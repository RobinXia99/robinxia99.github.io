import { useState, useEffect, useRef } from "react";
import "../styles/loading-screen.css";

const EXTRA_DELAY_MS = 1000;

export default function LoadingScreen({ sceneReady }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const sceneReadyTimeRef = useRef(null);

  useEffect(() => {
    const tick = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;

      if (!sceneReady) {
        // Still loading — animate up to 80%
        const pct = Math.min(elapsed / 2000, 0.8);
        setProgress(Math.round(pct * 100));
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Scene is ready — record when it became ready
      if (!sceneReadyTimeRef.current) sceneReadyTimeRef.current = timestamp;
      const sinceReady = timestamp - sceneReadyTimeRef.current;
      const remaining = Math.min(sinceReady / EXTRA_DELAY_MS, 1);
      const pct = 0.8 + remaining * 0.2;
      setProgress(Math.round(pct * 100));

      if (remaining < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 600);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sceneReady]);

  if (!visible) return null;

  return (
    <div className={`loading-screen${fadeOut ? " fade-out" : ""}`}>
      <img className="loading-screen__logo" src="/rx.svg" alt="RX" />
      <p className="loading-screen__progress">{progress}%</p>
    </div>
  );
}
