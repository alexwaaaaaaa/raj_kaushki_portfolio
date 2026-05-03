'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const gridVertexShader = `
  precision mediump float;
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vPosition;

  float grid(vec2 p, float size) {
    vec2 g = abs(fract(p / size - 0.5) - 0.5) / fwidth(p / size);
    return 1.0 - min(min(g.x, g.y), 1.0);
  }

  void main() {
    vec2 pos = vPosition.xz;
    float g1 = grid(pos, 1.0) * 0.6;
    float g2 = grid(pos, 5.0) * 0.4;
    float gridVal = max(g1, g2);

    float dist = length(vPosition.xz) / 20.0;
    float fade = 1.0 - smoothstep(0.3, 1.0, dist);

    float pulse = 0.85 + 0.15 * sin(uTime * 0.5);
    float alpha = gridVal * fade * uOpacity * pulse;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function GridFloor(): React.ReactElement {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#c9a84c') },
      uOpacity: { value: 0.4 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
    >
      <planeGeometry args={[60, 60, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default GridFloor;
