'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface LoadingScreen3DProps {
  progress: number;
}

export function LoadingScreen3D({ progress }: LoadingScreen3DProps): React.ReactElement {
  const groupRef = useRef<THREE.Group>(null);
  const rRef = useRef<THREE.Mesh>(null);
  const kRef = useRef<THREE.Mesh>(null);

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c9a84c',
        emissive: '#c9a84c',
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.9,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.8;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }
  });

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <group>
      <group ref={groupRef}>
        <Text
          font="/fonts/playfair.woff"
          fontSize={1.2}
          material={goldMaterial}
          position={[-0.7, 0, 0]}
          anchorX="center"
          anchorY="middle"
        >
          R
        </Text>
        <Text
          font="/fonts/playfair.woff"
          fontSize={1.2}
          material={goldMaterial}
          position={[0.7, 0, 0]}
          anchorX="center"
          anchorY="middle"
        >
          K
        </Text>
        <pointLight color="#c9a84c" intensity={2} position={[0, 0, 2]} />
      </group>

      {/* Progress bar as 3D plane */}
      <mesh position={[0, -2, 0]}>
        <planeGeometry args={[4, 0.06]} />
        <meshBasicMaterial color="#1a1625" />
      </mesh>
      <mesh position={[-2 + (clampedProgress / 100) * 2, -2, 0.01]}>
        <planeGeometry args={[(clampedProgress / 100) * 4, 0.06]} />
        <meshBasicMaterial color="#c9a84c" />
      </mesh>

      <ambientLight intensity={0.3} />
    </group>
  );
}

export default LoadingScreen3D;
