import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_X = 10;
const GRID_Y = 10;
const GRID_Z = 3;
const COUNT = GRID_X * GRID_Y * GRID_Z;
const CUBE_SIZE = 0.08;
const SPACING = 0.35;

function MatrixGrid({ scrollProgress = 0, accentColor = '#4cc2d9', mode = 'dark' }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store per-instance rotation state
  const instanceData = useMemo(() => {
    const data = [];
    for (let i = 0; i < COUNT; i++) {
      data.push({
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        flipTimer: Math.random() * 8 + 2, // seconds until next flip
        flipCountdown: Math.random() * 8 + 2,
        flipping: false,
        flipProgress: 0,
        flipAxis: 0, // 0=x, 1=y, 2=z
        flipDirection: 1,
      });
    }
    return data;
  }, []);

  // Base positions for each cube in the grid
  const basePositions = useMemo(() => {
    const positions = [];
    const offsetX = ((GRID_X - 1) * SPACING) / 2;
    const offsetY = ((GRID_Y - 1) * SPACING) / 2;
    const offsetZ = ((GRID_Z - 1) * SPACING) / 2;

    for (let x = 0; x < GRID_X; x++) {
      for (let y = 0; y < GRID_Y; y++) {
        for (let z = 0; z < GRID_Z; z++) {
          positions.push({
            x: x * SPACING - offsetX,
            y: y * SPACING - offsetY,
            z: z * SPACING - offsetZ,
          });
        }
      }
    }
    return positions;
  }, []);

  const geometry = useMemo(() => new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE), []);
  // eslint-disable-next-line no-unused-vars
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE)), []);

  // Initialize instance matrices
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < COUNT; i++) {
      const pos = basePositions[i];
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.rotation.set(instanceData[i].rotX, instanceData[i].rotY, instanceData[i].rotZ);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [basePositions, instanceData, dummy]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const clampedDelta = Math.min(delta, 0.05);
    const spreadFactor = 1 + scrollProgress * 0.4;

    for (let i = 0; i < COUNT; i++) {
      const data = instanceData[i];
      const pos = basePositions[i];

      // Continuous slow rotation
      data.rotX += data.speedX * clampedDelta;
      data.rotY += data.speedY * clampedDelta;

      // Random flip logic
      data.flipCountdown -= clampedDelta;
      if (data.flipCountdown <= 0 && !data.flipping) {
        data.flipping = true;
        data.flipProgress = 0;
        data.flipAxis = Math.floor(Math.random() * 3);
        data.flipDirection = Math.random() > 0.5 ? 1 : -1;
        data.flipCountdown = Math.random() * 6 + 3;
      }

      if (data.flipping) {
        data.flipProgress += clampedDelta * 4; // flip speed
        const snapAngle = (Math.PI / 2) * data.flipDirection;
        if (data.flipProgress >= 1) {
          // Snap to exact 90-degree increment
          if (data.flipAxis === 0) data.rotX = Math.round(data.rotX / (Math.PI / 2)) * (Math.PI / 2);
          else if (data.flipAxis === 1) data.rotY = Math.round(data.rotY / (Math.PI / 2)) * (Math.PI / 2);
          else data.rotZ = Math.round(data.rotZ / (Math.PI / 2)) * (Math.PI / 2);
          data.flipping = false;
        } else {
          const eased = data.flipProgress * data.flipProgress * (3 - 2 * data.flipProgress); // smoothstep
          if (data.flipAxis === 0) data.rotX += snapAngle * eased * clampedDelta * 4;
          else if (data.flipAxis === 1) data.rotY += snapAngle * eased * clampedDelta * 4;
          else data.rotZ += snapAngle * eased * clampedDelta * 4;
        }
      }

      // Position with scroll-based spread
      dummy.position.set(
        pos.x * spreadFactor,
        pos.y * spreadFactor,
        pos.z * spreadFactor
      );
      dummy.rotation.set(data.rotX, data.rotY, data.rotZ);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Rotate entire group based on scroll
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5;
    }
  });

  const fillColor = mode === 'dark' ? '#111111' : '#cccccc';
  const fillOpacity = mode === 'dark' ? 0.15 : 0.4;

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[geometry, null, COUNT]}>
        <meshBasicMaterial
          color={fillColor}
          transparent
          opacity={fillOpacity}
          side={THREE.DoubleSide}
        />
      </instancedMesh>
      {/* Edge wireframe overlay rendered via a second pass using lineSegments */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial
          color={accentColor}
          transparent
          opacity={mode === 'dark' ? 0.6 : 0.8}
        />
      </lineSegments>
    </group>
  );
}

export default MatrixGrid;
