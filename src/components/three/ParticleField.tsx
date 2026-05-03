'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '@/store/themeStore';

export function ParticleField(): React.ReactElement {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const scene3D = useThemeStore((s) => s.theme.scene3D);
  const count = scene3D.particleCount;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color1 = useMemo(() => new THREE.Color(scene3D.particleColor1), [scene3D.particleColor1]);
  const color2 = useMemo(() => new THREE.Color(scene3D.particleColor2), [scene3D.particleColor2]);

  // Precompute particle data
  const particleData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      scale: 0.02 + Math.random() * 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
      useColor1: i % 2 === 0,
    }));
  }, [count]);

  const rotations = useMemo(
    () => particleData.map(() => new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0)),
    [particleData]
  );

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.4,
        metalness: 0.8,
      }),
    []
  );

  // Set initial colors
  useMemo(() => {
    const colors = new Float32Array(count * 3);
    particleData.forEach((p, i) => {
      const c = p.useColor1 ? color1 : color2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    });
    geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colors, 3));
    material.vertexColors = true;
  }, [particleData, geometry, material, color1, color2, count]);

  useFrame(({ clock, camera }) => {
    if (!instancedMeshRef.current) return;
    const t = clock.getElapsedTime();
    const mouseX = 0; // Could wire up mouse here

    particleData.forEach((p, i) => {
      const opacity = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase);
      const floatY = Math.sin(t * 0.3 + p.phase) * 0.3;

      rotations[i].x += p.rotationSpeed.x;
      rotations[i].y += p.rotationSpeed.y;
      rotations[i].z += p.rotationSpeed.z;

      dummy.position.set(p.position.x, p.position.y + floatY, p.position.z);
      dummy.rotation.copy(rotations[i]);
      dummy.scale.setScalar(p.scale * opacity);
      dummy.updateMatrix();
      instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[geometry, material, count]} frustumCulled>
      {/* geometry and material supplied via args */}
    </instancedMesh>
  );
}

export default ParticleField;
