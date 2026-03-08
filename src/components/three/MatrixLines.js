import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 12;
const GRID_SPACING = 0.5;
const GRID_LAYERS = 3;

function MatrixLines({ scrollProgress = 0, accentColor = '#4cc2d9', mode = 'dark' }) {
  const linesRef = useRef();
  const groupRef = useRef();

  const geometry = useMemo(() => {
    const vertices = [];
    const halfSize = (GRID_SIZE * GRID_SPACING) / 2;

    // Create grid lines on each layer (XY planes at different Z depths)
    for (let layer = 0; layer < GRID_LAYERS; layer++) {
      const z = (layer - (GRID_LAYERS - 1) / 2) * 1.2;

      // Horizontal lines (along X)
      for (let i = 0; i <= GRID_SIZE; i++) {
        const y = i * GRID_SPACING - halfSize;
        vertices.push(-halfSize, y, z);
        vertices.push(halfSize, y, z);
      }

      // Vertical lines (along Y)
      for (let i = 0; i <= GRID_SIZE; i++) {
        const x = i * GRID_SPACING - halfSize;
        vertices.push(x, -halfSize, z);
        vertices.push(x, halfSize, z);
      }
    }

    // Connecting lines between layers (depth lines)
    const step = 3; // skip some grid points for subtlety
    for (let i = 0; i <= GRID_SIZE; i += step) {
      for (let j = 0; j <= GRID_SIZE; j += step) {
        const x = i * GRID_SPACING - halfSize;
        const y = j * GRID_SPACING - halfSize;
        for (let layer = 0; layer < GRID_LAYERS - 1; layer++) {
          const z1 = (layer - (GRID_LAYERS - 1) / 2) * 1.2;
          const z2 = (layer + 1 - (GRID_LAYERS - 1) / 2) * 1.2;
          vertices.push(x, y, z1);
          vertices.push(x, y, z2);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Subtle parallax movement based on scroll
    groupRef.current.position.y = scrollProgress * -0.5;
    groupRef.current.position.z = scrollProgress * -0.3;
    groupRef.current.rotation.x = scrollProgress * 0.1;
  });

  const opacity = mode === 'dark' ? 0.08 : 0.12;

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={geometry}>
        <lineBasicMaterial
          color={accentColor}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default MatrixLines;
