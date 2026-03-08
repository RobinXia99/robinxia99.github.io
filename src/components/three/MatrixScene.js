import React from 'react';
import MatrixGrid from './MatrixGrid';
import MatrixLines from './MatrixLines';

function MatrixScene({ scrollProgress = 0, accentColor = '#4cc2d9', mode = 'dark' }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <MatrixLines
        scrollProgress={scrollProgress}
        accentColor={accentColor}
        mode={mode}
      />
      <MatrixGrid
        scrollProgress={scrollProgress}
        accentColor={accentColor}
        mode={mode}
      />
    </>
  );
}

export default MatrixScene;
