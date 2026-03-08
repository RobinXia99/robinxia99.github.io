import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Misty Mountains ── */
function Mountain({ position, scale, color, opacity }) {
  const geo = useMemo(() => {
    const g = new THREE.ConeGeometry(1, 2, 6, 1);
    // Randomize vertices slightly for organic feel
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > -0.9) {
        pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.25);
        pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.25);
      }
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function MountainRange({ mode, scrollProgress }) {
  const groupRef = useRef();
  const isDark = mode === 'dark';

  const mountains = useMemo(() => {
    const list = [];
    // Back layer — farthest, most faded
    for (let i = 0; i < 8; i++) {
      list.push({
        position: [(i - 4) * 3.5 + (Math.random() - 0.5) * 2, -1.5, -12 - Math.random() * 4],
        scale: [1.8 + Math.random() * 1.5, 2.5 + Math.random() * 3, 1.8 + Math.random() * 1.5],
        opacity: 0.15 + Math.random() * 0.1,
        layer: 'far',
      });
    }
    // Mid layer
    for (let i = 0; i < 6; i++) {
      list.push({
        position: [(i - 3) * 4 + (Math.random() - 0.5) * 2, -2, -7 - Math.random() * 3],
        scale: [1.2 + Math.random() * 1, 2 + Math.random() * 2.5, 1.2 + Math.random() * 1],
        opacity: 0.25 + Math.random() * 0.15,
        layer: 'mid',
      });
    }
    // Near layer
    for (let i = 0; i < 4; i++) {
      list.push({
        position: [(i - 2) * 5 + (Math.random() - 0.5) * 3, -2.5, -3 - Math.random() * 2],
        scale: [1 + Math.random() * 0.8, 1.5 + Math.random() * 2, 1 + Math.random() * 0.8],
        opacity: 0.35 + Math.random() * 0.15,
        layer: 'near',
      });
    }
    return list;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = scrollProgress * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      {mountains.map((m, i) => (
        <Mountain
          key={i}
          position={m.position}
          scale={m.scale}
          color={isDark ? '#1a2030' : '#8899aa'}
          opacity={m.opacity}
        />
      ))}
    </group>
  );
}

/* ── Floating Particles (petals / dust motes) ── */
function FloatingPetals({ count = 120, accentColor, mode }) {
  const meshRef = useRef();
  const isDark = mode === 'dark';
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 12 - 2,
      z: (Math.random() - 0.5) * 16 - 4,
      speedY: -(0.002 + Math.random() * 0.004),
      speedX: (Math.random() - 0.5) * 0.003,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.2 + Math.random() * 0.5,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      rot: Math.random() * Math.PI * 2,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(t * p.driftSpeed + p.drift) * 0.002;
      p.rot += p.rotSpeed;

      // Reset when fallen below
      if (p.y < -3) {
        p.y = 10;
        p.x = (Math.random() - 0.5) * 20;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rot, p.rot * 0.5, 0);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <planeGeometry args={[1, 0.6]} />
      <meshBasicMaterial
        color={accentColor}
        transparent
        opacity={isDark ? 0.4 : 0.5}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ── Clouds / Mist Layers ── */
function MistLayer({ y, z, mode, scrollProgress }) {
  const ref = useRef();
  const isDark = mode === 'dark';

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.05 + z) * 0.5;
      ref.current.material.opacity = (isDark ? 0.08 : 0.12) + Math.sin(state.clock.elapsedTime * 0.1 + z * 2) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 10]} />
      <meshBasicMaterial
        color={isDark ? '#111825' : '#d0d8e0'}
        transparent
        opacity={isDark ? 0.08 : 0.12}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Simple Torii / Gateway silhouette ── */
function Gateway({ position, mode, accentColor }) {
  const isDark = mode === 'dark';
  const gateColor = isDark ? '#151a25' : '#667788';

  return (
    <group position={position}>
      {/* Left pillar */}
      <mesh position={[-0.8, 0.8, 0]}>
        <boxGeometry args={[0.12, 1.8, 0.12]} />
        <meshStandardMaterial color={gateColor} roughness={0.9} transparent opacity={0.6} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[0.8, 0.8, 0]}>
        <boxGeometry args={[0.12, 1.8, 0.12]} />
        <meshStandardMaterial color={gateColor} roughness={0.9} transparent opacity={0.6} />
      </mesh>
      {/* Top beam */}
      <mesh position={[0, 1.75, 0]}>
        <boxGeometry args={[2, 0.1, 0.14]} />
        <meshStandardMaterial color={gateColor} roughness={0.9} transparent opacity={0.6} />
      </mesh>
      {/* Upper beam with slight overhang */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[1.8, 0.06, 0.12]} />
        <meshStandardMaterial color={gateColor} roughness={0.9} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ── Main Scene ── */
export default function AncientChinaScene({ scrollProgress = 0, accentColor = '#4cc2d9', mode = 'dark' }) {
  const sceneRef = useRef();
  const isDark = mode === 'dark';

  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = scrollProgress * 0.1;
    }
  });

  return (
    <>
      {/* Atmosphere */}
      <fog attach="fog" args={[isDark ? '#080c14' : '#c8d0d8', 4, 22]} />
      <ambientLight intensity={isDark ? 0.2 : 0.5} />

      {/* Moonlight / sunlight from above-behind */}
      <directionalLight
        position={[2, 8, -5]}
        intensity={isDark ? 0.6 : 0.8}
        color={isDark ? '#4466aa' : '#ffffee'}
      />

      {/* Accent colored subtle rim light */}
      <pointLight
        position={[-5, 3, -2]}
        intensity={isDark ? 1.5 : 0.8}
        color={accentColor}
        distance={15}
      />

      <group ref={sceneRef}>
        <MountainRange mode={mode} scrollProgress={scrollProgress} />

        {/* Gateways scattered in the scene */}
        <Gateway position={[-2, -2.3, -4]} mode={mode} accentColor={accentColor} />
        <Gateway position={[4, -2.3, -7]} mode={mode} accentColor={accentColor} />

        {/* Mist layers at different heights */}
        <MistLayer y={-0.5} z={-5} mode={mode} scrollProgress={scrollProgress} />
        <MistLayer y={0.5} z={-8} mode={mode} scrollProgress={scrollProgress} />
        <MistLayer y={-1} z={-3} mode={mode} scrollProgress={scrollProgress} />

        {/* Floating petals */}
        <FloatingPetals count={100} accentColor={accentColor} mode={mode} />
      </group>
    </>
  );
}
