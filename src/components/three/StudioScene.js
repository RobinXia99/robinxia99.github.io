import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Cyclorama({ mode }) {
  const isDark = mode === 'dark';
  const wallColor = isDark ? '#0d0d0d' : '#f0f0f0';

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Floor extends from z = -8 to z = 2 (front)
    // Back wall curves up from floor
    shape.moveTo(-8, 0);    // far left floor
    shape.lineTo(8, 0);     // far right floor
    shape.lineTo(8, 8);     // right wall top
    shape.lineTo(-8, 8);    // left wall top
    shape.lineTo(-8, 0);    // close

    const path = new THREE.CurvePath();

    // Create the profile curve: flat floor -> smooth curve -> vertical wall
    const points = [];
    const segments = 40;

    // Floor section (z: 4 to -2)
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      points.push(new THREE.Vector3(0, 0, 4 - t * 6));
    }

    // Curved section (smooth bend from floor to wall)
    for (let i = 1; i <= 15; i++) {
      const t = i / 15;
      const angle = (t * Math.PI) / 2;
      const z = -2 - Math.sin(angle) * 3;
      const y = (1 - Math.cos(angle)) * 3;
      points.push(new THREE.Vector3(0, y, z));
    }

    // Wall section going up
    for (let i = 1; i <= 10; i++) {
      const t = i / 10;
      points.push(new THREE.Vector3(0, 3 + t * 5, -5));
    }

    const geo = new THREE.BufferGeometry();
    const width = 20;
    const vertices = [];
    const normals = [];
    const uvs = [];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      // Left and right edges
      const l0 = new THREE.Vector3(-width / 2, p0.y, p0.z);
      const r0 = new THREE.Vector3(width / 2, p0.y, p0.z);
      const l1 = new THREE.Vector3(-width / 2, p1.y, p1.z);
      const r1 = new THREE.Vector3(width / 2, p1.y, p1.z);

      // Triangle 1
      vertices.push(l0.x, l0.y, l0.z);
      vertices.push(r0.x, r0.y, r0.z);
      vertices.push(l1.x, l1.y, l1.z);

      // Triangle 2
      vertices.push(r0.x, r0.y, r0.z);
      vertices.push(r1.x, r1.y, r1.z);
      vertices.push(l1.x, l1.y, l1.z);

      // Approximate normal
      const edge1 = new THREE.Vector3().subVectors(r0, l0);
      const edge2 = new THREE.Vector3().subVectors(l1, l0);
      const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

      for (let j = 0; j < 6; j++) {
        normals.push(normal.x, normal.y, normal.z);
      }

      const u0 = i / (points.length - 1);
      const u1 = (i + 1) / (points.length - 1);
      uvs.push(0, u0, 1, u0, 0, u1);
      uvs.push(1, u0, 1, u1, 0, u1);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    return geo;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow position={[0, -2, 0]}>
      <meshStandardMaterial
        color={wallColor}
        roughness={0.85}
        metalness={0}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

function StudioLight({ position, intensity, color, targetPos }) {
  const lightRef = useRef();
  const meshRef = useRef();

  useFrame(() => {
    if (lightRef.current && targetPos) {
      lightRef.current.target.position.set(...targetPos);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <group position={position}>
      {/* Light housing */}
      <mesh ref={meshRef} castShadow={false}>
        <boxGeometry args={[0.4, 0.5, 0.3]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Light bulb glow */}
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Actual spotlight */}
      <spotLight
        ref={lightRef}
        intensity={intensity}
        color={color}
        angle={0.5}
        penumbra={0.8}
        distance={20}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
    </group>
  );
}

export default function StudioScene({ scrollProgress = 0, accentColor = '#4cc2d9', mode = 'dark' }) {
  const groupRef = useRef();
  const isDark = mode === 'dark';

  useFrame(() => {
    if (groupRef.current) {
      // Subtle rotation based on scroll
      groupRef.current.rotation.y = scrollProgress * 0.15;
      groupRef.current.position.y = scrollProgress * -0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.15 : 0.4} />

      <group ref={groupRef}>
        <Cyclorama mode={mode} />

        {/* Key light — accent colored, from upper left */}
        <StudioLight
          position={[-4, 4, 2]}
          intensity={isDark ? 8 : 5}
          color={accentColor}
          targetPos={[0, -1, -2]}
        />

        {/* Fill light — soft white, from upper right */}
        <StudioLight
          position={[4, 3.5, 1]}
          intensity={isDark ? 4 : 3}
          color={isDark ? '#c0c0c0' : '#ffffff'}
          targetPos={[0, -1, -2]}
        />

        {/* Back/rim light — subtle, from behind */}
        <StudioLight
          position={[0, 5, -3]}
          intensity={isDark ? 3 : 2}
          color={isDark ? '#6688aa' : '#aabbcc'}
          targetPos={[0, -2, 0]}
        />
      </group>
    </>
  );
}
