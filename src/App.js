import "./App.css";

import { useRef, useState } from "react";
import Header from "./components/header";
import SideBars from "./components/sidebars";
import { Canvas } from "@react-three/fiber";
import ThreeContent from "./components/threecontent";
import MainFlow from "./components/main_flow";

function App() {
  let mediaQuery = window.matchMedia("(max-width: 700px)");

  const aboutRef = useRef();
  const experienceRef = useRef();
  const projectsRef = useRef();

  const viewport = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  const [device, setDevice] = useState(() => {
    if (mediaQuery.matches) {
      return "mobile";
    } else {
      return "web";
    }
  });

  mediaQuery.addEventListener("change", () => {
    if (mediaQuery.matches) {
      setDevice("mobile");
    } else {
      setDevice("web");
    }
  });

  return (
    <div className="App">
      <Header
        device={device}
        aboutRef={aboutRef}
        experienceRef={experienceRef}
        projectsRef={projectsRef}
      />
      <SideBars device={device} />
      <MainFlow
        viewport={viewport}
        aboutRef={aboutRef}
        experienceRef={experienceRef}
        projectsRef={projectsRef}
      />

      <Canvas
        className="webGL"
        camera={{
          position: [0, 0, 3],
          fov: 50,
          aspect: viewport.width / viewport.height,
          near: 0.1,
          far: 150,
        }}
      >
        <ThreeContent />
      </Canvas>
    </div>
  );
}

export default App;
