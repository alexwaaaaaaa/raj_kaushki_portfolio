'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioExperience } from '@/hooks/usePortfolioData';

export function ExperienceTunnel(): React.ReactElement {
  const experience = usePortfolioExperience();
  const groupRef = useRef<THREE.Group>(null);
  const cameraTargetZ = useRef(0);

  const ringCount = 30;
  const tunnelLength = 40;

  const ringGeometry = useMemo(() => new THREE.TorusGeometry(2.5, 0.03, 8, 40), []);
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c9a84c',
        emissive: '#c9a84c',
        emissiveIntensity: 0.15,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  const rings = useMemo(
    () =>
      Array.from({ length: ringCount }, (_, i) => ({
        z: -(i / ringCount) * tunnelLength,
        scale: 0.5 + (i / ringCount) * 0.8,
        key: `ring-${i}`,
      })),
    [ringCount, tunnelLength]
  );

  useFrame(({ camera }) => {
    // Camera auto-drift through tunnel
    const t = Date.now() * 0.0002;
    camera.position.z = Math.sin(t) * 1.5 - 5;
    camera.position.y = Math.sin(t * 0.7) * 0.5;
    camera.lookAt(0, 0, -20);
  });

  const cardPositions = useMemo(
    () =>
      experience.map((_, i) => ({
        z: -((i + 1) / (experience.length + 1)) * tunnelLength,
        side: i % 2 === 0 ? -3 : 3,
      })),
    [experience, tunnelLength]
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {rings.map((ring) => (
        <mesh
          key={ring.key}
          position={[0, 0, ring.z]}
          geometry={ringGeometry}
          material={ringMaterial}
          scale={ring.scale}
        />
      ))}

      {experience.map((exp, i) => {
        const cp = cardPositions[i];
        return (
          <Html
            key={exp.id}
            position={[cp.side, 0, cp.z]}
            transform
            occlude
            style={{ width: 280, pointerEvents: 'none' }}
          >
            <div style={{
              background: 'rgba(13,11,20,0.92)',
              border: '1px solid rgba(201,168,76,0.35)',
              borderRadius: 12,
              padding: '16px 20px',
              color: '#f5f3ff',
              fontFamily: 'DM Sans, sans-serif',
              backdropFilter: 'blur(12px)',
              fontSize: 13,
            }}>
              <div style={{ color: '#c9a84c', fontWeight: 700, marginBottom: 4 }}>{exp.role}</div>
              <div style={{ color: '#b8b4d0', fontSize: 11, marginBottom: 8 }}>{exp.company} · {exp.duration}</div>
              <div style={{ color: '#7a7490', fontSize: 11 }}>{exp.bullets[0]}</div>
            </div>
          </Html>
        );
      })}
    </group>
  );
}

export default ExperienceTunnel;
