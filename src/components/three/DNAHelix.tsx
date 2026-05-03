'use client';

import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '@/store/themeStore';

interface HelixNode {
  position: THREE.Vector3;
  strand: 0 | 1;
  index: number;
}

const helixVertexShader = `
  precision mediump float;
  uniform float uTime;
  uniform float uWaveAmplitude;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    float wave = sin(pos.y * 2.0 + uTime * 2.0) * uWaveAmplitude;
    pos.x += wave;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const helixFragmentShader = `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uEmissive;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    vec3 color = uColor + uColor * uEmissive;
    color += vec3(fresnel * 0.4);
    float alpha = 0.85 + 0.15 * sin(uTime + vPosition.y * 3.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

const NODE_COUNT = 40;
const HELIX_RADIUS = 0.8;
const HELIX_HEIGHT = 6.0;
const HELIX_PITCH = (Math.PI * 2) / 10;

function buildHelixNodes(): HelixNode[] {
  const nodes: HelixNode[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const t = i / NODE_COUNT;
    const angle = t * Math.PI * 2 * 3;
    const y = t * HELIX_HEIGHT - HELIX_HEIGHT / 2;
    nodes.push({
      position: new THREE.Vector3(Math.cos(angle) * HELIX_RADIUS, y, Math.sin(angle) * HELIX_RADIUS),
      strand: 0,
      index: i,
    });
    nodes.push({
      position: new THREE.Vector3(Math.cos(angle + Math.PI) * HELIX_RADIUS, y, Math.sin(angle + Math.PI) * HELIX_RADIUS),
      strand: 1,
      index: i,
    });
  }
  return nodes;
}

export function DNAHelix(): React.ReactElement {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const scene3D = useThemeStore((s) => s.theme.scene3D);
  const helixColor = scene3D.helixColor;
  const rotationSpeed = scene3D.helixRotationSpeed;

  const helixNodes = useMemo(() => buildHelixNodes(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(helixColor) },
      uEmissive: { value: 0.3 },
      uWaveAmplitude: { value: 0.05 },
    }),
    [helixColor]
  );

  const nodeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: helixVertexShader,
        fragmentShader: helixFragmentShader,
        uniforms,
        transparent: true,
      }),
    [uniforms]
  );

  const connectorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(helixColor),
        emissive: new THREE.Color(helixColor),
        emissiveIntensity: 0.1,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: 0.6,
      }),
    [helixColor]
  );

  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.08, 12, 12), []);
  const connectorGeometry = useMemo(() => new THREE.CylinderGeometry(0.015, 0.015, 1, 6), []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
    uniforms.uTime.value = clock.getElapsedTime();
  });

  // Build connectors between paired nodes
  const connectors = useMemo(() => {
    const pairs: Array<{ from: THREE.Vector3; to: THREE.Vector3; key: string }> = [];
    for (let i = 0; i < NODE_COUNT; i += 3) {
      const n1 = helixNodes[i * 2];
      const n2 = helixNodes[i * 2 + 1];
      if (n1 && n2) {
        pairs.push({ from: n1.position, to: n2.position, key: `conn-${i}` });
      }
    }
    return pairs;
  }, [helixNodes]);

  const getConnectorTransform = useCallback(
    (from: THREE.Vector3, to: THREE.Vector3): { pos: THREE.Vector3; rot: THREE.Euler; len: number } => {
      const midpoint = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const direction = new THREE.Vector3().subVectors(to, from);
      const length = direction.length();
      const normalized = direction.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normalized);
      const euler = new THREE.Euler().setFromQuaternion(quaternion);
      return { pos: midpoint, rot: euler, len: length };
    },
    []
  );

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      {/* Helix nodes */}
      {helixNodes.map((node, i) => {
        const isHovered = hoveredNode === i;
        const scale = isHovered ? 2.5 : 1;
        return (
          <mesh
            key={`node-${i}`}
            position={node.position}
            geometry={nodeGeometry}
            material={nodeMaterial}
            scale={scale}
            onPointerEnter={() => setHoveredNode(i)}
            onPointerLeave={() => setHoveredNode(null)}
          />
        );
      })}
      {/* Cross connectors */}
      {connectors.map(({ from, to, key }) => {
        const { pos, rot, len } = getConnectorTransform(from, to);
        return (
          <mesh
            key={key}
            position={pos}
            rotation={rot}
            scale={[1, len, 1]}
            geometry={connectorGeometry}
            material={connectorMaterial}
          />
        );
      })}
      {/* Ambient point light for helix glow */}
      <pointLight color={helixColor} intensity={1.5} distance={6} decay={2} />
    </group>
  );
}

export default DNAHelix;
