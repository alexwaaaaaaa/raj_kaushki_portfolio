'use client';

import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioSkills } from '@/hooks/usePortfolioData';
import { useThemeStore } from '@/store/themeStore';

interface SphereData {
  id: string;
  name: string;
  level: number;
  radius: number;
  speed: number;
  inclination: number;
  phase: number;
  color: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Core: '#c9a84c',
  Soft: '#7c6fcd',
  Operations: '#4caf8c',
};

export function SkillSpheres(): React.ReactElement {
  const skills = usePortfolioSkills();
  const scene3D = useThemeStore((s) => s.theme.scene3D);
  const orbitSpeed = scene3D.skillSphereOrbitSpeed;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const sphereData = useMemo<SphereData[]>(() =>
    skills.map((skill, i) => ({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      radius: 2 + (i % 4) * 0.6,
      speed: (0.3 + (i % 3) * 0.15) * orbitSpeed,
      inclination: (i / skills.length) * Math.PI,
      phase: (i / skills.length) * Math.PI * 2,
      color: CATEGORY_COLORS[skill.category] ?? '#c9a84c',
    })),
    [skills, orbitSpeed]
  );

  const positions = useRef<THREE.Vector3[]>(sphereData.map(() => new THREE.Vector3()));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    sphereData.forEach((s, i) => {
      const angle = t * s.speed + s.phase;
      const x = Math.cos(angle) * s.radius;
      const y = Math.sin(s.inclination) * Math.sin(angle) * s.radius * 0.4;
      const z = Math.sin(angle) * s.radius * 0.6;
      positions.current[i].set(x, y, z);
    });
  });

  return (
    <group ref={groupRef} position={[-2, 0, 0]}>
      {/* Central core sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#c9a84c"
          emissive="#c9a84c"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <pointLight color="#c9a84c" intensity={1} distance={8} decay={2} />

      {sphereData.map((s, i) => {
        const isHovered = hoveredId === s.id;
        const sphereSize = 0.06 + (s.level / 100) * 0.18;

        return (
          <AnimatedSphere
            key={s.id}
            sphereData={s}
            index={i}
            positionRef={positions}
            isHovered={isHovered}
            sphereSize={sphereSize}
            onHover={setHoveredId}
          />
        );
      })}
    </group>
  );
}

interface AnimatedSphereProps {
  sphereData: SphereData;
  index: number;
  positionRef: React.MutableRefObject<THREE.Vector3[]>;
  isHovered: boolean;
  sphereSize: number;
  onHover: (id: string | null) => void;
}

function AnimatedSphere({ sphereData, index, positionRef, isHovered, sphereSize, onHover }: AnimatedSphereProps): React.ReactElement {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const pos = positionRef.current[index];
      meshRef.current.position.lerp(pos, 0.05);
      const targetScale = isHovered ? 2.0 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => onHover(sphereData.id)}
      onPointerLeave={() => onHover(null)}
    >
      <sphereGeometry args={[sphereSize, 16, 16]} />
      <meshPhysicalMaterial
        color={sphereData.color}
        emissive={sphereData.color}
        emissiveIntensity={isHovered ? 0.8 : 0.2}
        roughness={0.1}
        metalness={0.9}
        reflectivity={1}
      />
      {isHovered && (
        <Html distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(13,11,20,0.9)',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: 8,
            padding: '6px 10px',
            whiteSpace: 'nowrap',
            color: '#f5f3ff',
            fontSize: 12,
            fontFamily: 'DM Sans, sans-serif',
          }}>
            <div style={{ color: sphereData.color, fontWeight: 700 }}>{sphereData.name}</div>
            <div style={{ color: '#b8b4d0' }}>{sphereData.level}%</div>
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default SkillSpheres;
