import './App.css';

import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import { useScrollPosition } from './hooks/useScrollPosition';
import { useMediaQuery } from './hooks/useMediaQuery';

import CustomCursor from './components/cursor/CustomCursor';
import Header from './components/layout/Header';
import SocialSidebar from './components/layout/SocialSidebar';
import ColorPicker from './components/layout/ColorPicker';
import Footer from './components/layout/Footer';
import GridScene from './components/three/GridScene';
import LoadingScreen from './components/LoadingScreen';

import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';

function AppContent() {
  const { accentColor, mode } = useTheme();
  const { scrollProgress } = useScrollPosition();
  const isMobile = useMediaQuery();
  const [sceneReady, setSceneReady] = useState(false);
  const onCreated = useCallback(() => setSceneReady(true), []);

  return (
    <div className="App">
      <LoadingScreen sceneReady={sceneReady} />
      <CustomCursor />
      <Header />
      {!isMobile && <SocialSidebar />}
      {!isMobile && <ColorPicker />}

      <Canvas
        className="webGL"
        camera={{
          position: [0, 0, 10],
          fov: 40,
          near: 0.1,
          far: 50,
        }}
        onCreated={onCreated}
      >
        <Suspense fallback={null}>
          <GridScene
            accentColor={accentColor}
            mode={mode}
          />
        </Suspense>
      </Canvas>

      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CursorProvider>
        <AppContent />
      </CursorProvider>
    </ThemeProvider>
  );
}

export default App;
