
import './App.css';

import { useState } from 'react';
import Header from './components/header';
import SideBars from './components/sidebars';
import { Canvas } from '@react-three/fiber';
import ThreeContent from './components/threecontent';
import { OrbitControls } from '@react-three/drei';

function App() {

  let mediaQuery = window.matchMedia('(max-width: 700px)');

  const viewport = {
    height: window.innerHeight,
    width: window.innerWidth
  }

  const [device, setDevice] = useState(() => {

    if (mediaQuery.matches) {
      return 'mobile'
    } else {
      return 'web'
    }

  });

  mediaQuery.addEventListener('change', () => {

    if (mediaQuery.matches) {
      setDevice('mobile');
    } else {
      setDevice('web');
    }
  });


  return (
    <div className="App">
      <Header/>
      <SideBars/>

      <Canvas
      className='webGL'
      camera={{ position: [0, 0.5, 6.5], fov: 50, aspect: viewport.width / viewport.height, near: 0.1, far: 150 }}
      
      >
        <ThreeContent/>
        <OrbitControls/>

      </Canvas>
    </div>
  );
}

export default App;
