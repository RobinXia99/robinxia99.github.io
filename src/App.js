
import './App.css';

import NavigationBar from './components/navbar';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router';
import AboutMe from './components/aboutme';
import Projects from './components/projects';
import Resume from './components/resume';

function App() {

  let mediaQuery = window.matchMedia('(max-width: 700px)');

  const [device, setDevice] = useState(() => {

    if(mediaQuery.matches) {
      return 'mobile'
  } else {
      return 'web'
  }

  });

  mediaQuery.addEventListener('change', () => {

    if(mediaQuery.matches) {
      setDevice('mobile');
  } else {
      setDevice('web');
  }
  });


  return (
    <div className="App">
      <NavigationBar device={device}/>
      <Routes>
        <Route exact path='/' element={
          <AboutMe/>
        } />
        <Route exact path='/projects' element={
          <Projects/>
        } />

        <Route exact path='/resume' element={
          <Resume/>
        } />
      </Routes>
    </div>
  );
}

export default App;
