import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 30;
const GRID_SEGMENTS = 40;
const CELL = GRID_SIZE / GRID_SEGMENTS; // 0.75
const HALF = CELL / 2;
const GRID_ROTATION = 0.3;

// Directions: +x, -x, +z, -z
const DIRS = [
  { dx: 1, dz: 0, ax: 0, ay: 0, az: -1 },
  { dx: -1, dz: 0, ax: 0, ay: 0, az: 1 },
  { dx: 0, dz: 1, ax: 1, ay: 0, az: 0 },
  { dx: 0, dz: -1, ax: -1, ay: 0, az: 0 },
];

/* ── Static Grid ── */
function StaticGrid({ accentColor, mode }) {
  const isDark = mode === 'dark';

  const geo = useMemo(() => {
    const half = GRID_SIZE / 2;
    const vertices = [];

    for (let i = 0; i <= GRID_SEGMENTS; i++) {
      const v = -half + i * CELL;
      vertices.push(-half, 0, v, half, 0, v);
      vertices.push(v, 0, -half, v, 0, half);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo} position={[0, -2, 0]} rotation={[GRID_ROTATION, 0, 0]}>
      <lineBasicMaterial color={accentColor} transparent opacity={isDark ? 0.12 : 0.18} />
    </lineSegments>
  );
}

/* ── Smooth easing ── */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ── Rolling Cube (scroll-driven) ── */
function RollingCube({ startX, startZ, accentColor, mode, scrollThreshold }) {
  const groupRef = useRef();
  const isDark = mode === 'dark';

  const state = useRef({
    gx: startX,
    gz: startZ,
    rolling: false,
    rollProgress: 0,
    dir: null,
    baseQuat: new THREE.Quaternion(),
    lastScroll: 0,
    scrollAccum: 0,
  });

  const edges = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(CELL, CELL, CELL));
  }, []);

  // Grid pivot: grid is at [0, -2, 0] with rotation [0.3, 0, 0]
  const gridRotQuat = useMemo(() => {
    return new THREE.Quaternion().setFromEuler(new THREE.Euler(GRID_ROTATION, 0, 0));
  }, []);

  const gridOrigin = useMemo(() => new THREE.Vector3(0, -2, 0), []);

  // Reusable objects — avoid per-frame allocations
  const _tmpVec = useMemo(() => new THREE.Vector3(), []);
  const _tmpVec2 = useMemo(() => new THREE.Vector3(), []);
  const _tmpVec3 = useMemo(() => new THREE.Vector3(), []);
  const _tmpQuat = useMemo(() => new THREE.Quaternion(), []);
  const _rollAxis = useMemo(() => new THREE.Vector3(), []);

  // Transform a local grid-space position to world space (reuses _tmpVec)
  const applyGridTransform = (x, y, z) => {
    return _tmpVec.set(x, y, z).applyQuaternion(gridRotQuat).add(gridOrigin);
  };

  useFrame(() => {
    const s = state.current;
    const group = groupRef.current;
    if (!group) return;

    // Read scroll from window
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollNorm = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const scrollDelta = Math.abs(scrollNorm - s.lastScroll);
    s.lastScroll = scrollNorm;

    if (!s.rolling) {
      s.scrollAccum += scrollDelta;

      if (s.scrollAccum >= scrollThreshold) {
        s.scrollAccum = 0;

        // Visible grid bounds (in cell units)
        const MIN_X = -6;
        const MAX_X = 6;
        const MIN_Z = -4;
        const MAX_Z = 5;

        // Pick a random valid direction (Fisher-Yates on 4 items)
        const shuffled = [...DIRS];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        let picked = null;
        for (const dir of shuffled) {
          const nx = s.gx + dir.dx;
          const nz = s.gz + dir.dz;
          if (nx >= MIN_X && nx <= MAX_X && nz >= MIN_Z && nz <= MAX_Z) {
            picked = dir;
            break;
          }
        }
        if (!picked) return;

        s.dir = picked;
        s.rolling = true;
        s.rollProgress = 0;
      }

      // Snap position when idle — centered in cell, HALF above grid surface
      const pos = applyGridTransform(s.gx * CELL + HALF, HALF, s.gz * CELL + HALF);
      group.position.copy(pos);
      group.quaternion.copy(gridRotQuat).multiply(s.baseQuat);
      return;
    }

    // Animate roll smoothly
    s.rollProgress += 0.05;
    const t = Math.min(s.rollProgress, 1);
    const eased = easeInOutCubic(t);
    const angle = eased * (Math.PI / 2);

    const dir = s.dir;

    // Cell center in grid-local space
    const cx = s.gx * CELL + HALF;
    const cz = s.gz * CELL + HALF;

    // Pivot is at the leading bottom edge
    const pivotX = cx + dir.dx * HALF;
    const pivotZ = cz + dir.dz * HALF;

    // Rotate offset around pivot axis (reuse temp objects)
    _rollAxis.set(dir.ax, dir.ay, dir.az);
    _tmpQuat.setFromAxisAngle(_rollAxis, angle);
    _tmpVec2.set(-dir.dx * HALF, HALF, -dir.dz * HALF).applyQuaternion(_tmpQuat);

    // Final position in grid-local space, then transform to world
    _tmpVec3.set(pivotX + _tmpVec2.x, _tmpVec2.y, pivotZ + _tmpVec2.z)
      .applyQuaternion(gridRotQuat)
      .add(gridOrigin);
    group.position.copy(_tmpVec3);

    // Cube rotation = gridRot * rollQuat * baseQuat
    group.quaternion.copy(gridRotQuat).multiply(_tmpQuat).multiply(s.baseQuat);

    if (t >= 1) {
      s.gx += dir.dx;
      s.gz += dir.dz;

      _tmpQuat.setFromAxisAngle(_rollAxis, Math.PI / 2);
      s.baseQuat.premultiply(_tmpQuat);

      s.rolling = false;
      s.rollProgress = 0;
    }
  });

  const initPos = new THREE.Vector3(
    startX * CELL + HALF, HALF, startZ * CELL + HALF
  ).applyQuaternion(gridRotQuat).add(gridOrigin);

  return (
    <group ref={groupRef} position={initPos}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={accentColor} transparent opacity={isDark ? 0.5 : 0.6} />
      </lineSegments>
      <mesh>
        <boxGeometry args={[CELL, CELL, CELL]} />
        <meshBasicMaterial color={accentColor} transparent opacity={isDark ? 0.05 : 0.07} />
      </mesh>
    </group>
  );
}

/* ── Floating Particles ── */
function FloatingParticles({ count = 60, accentColor, mode }) {
  const meshRef = useRef();
  const isDark = mode === 'dark';
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 8 - 2,
      z: (Math.random() - 0.5) * 12 - 2,
      speedY: 0.001 + Math.random() * 0.003,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.2 + Math.random() * 0.4,
      scale: 0.015 + Math.random() * 0.025,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      p.y += p.speedY;
      if (p.y > 7) {
        p.y = -2;
        p.x = (Math.random() - 0.5) * 16;
      }
      dummy.position.set(
        p.x + Math.sin(t * p.driftSpeed + p.drift) * 0.3,
        p.y,
        p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={accentColor} transparent opacity={isDark ? 0.35 : 0.45} />
    </instancedMesh>
  );
}

/* ── Main ── */
export default function GridScene({ accentColor = '#4cc2d9', mode = 'dark' }) {
  return (
    <>
      <StaticGrid accentColor={accentColor} mode={mode} />
      <RollingCube startX={-3} startZ={2} accentColor={accentColor} mode={mode} scrollThreshold={0.008} />
      <RollingCube startX={5} startZ={-4} accentColor={accentColor} mode={mode} scrollThreshold={0.012} />
      <RollingCube startX={0} startZ={-1} accentColor={accentColor} mode={mode} scrollThreshold={0.01} />
      <RollingCube startX={-5} startZ={-3} accentColor={accentColor} mode={mode} scrollThreshold={0.009} />
      <RollingCube startX={3} startZ={4} accentColor={accentColor} mode={mode} scrollThreshold={0.011} />
      <FloatingParticles count={60} accentColor={accentColor} mode={mode} />
    </>
  );
}
