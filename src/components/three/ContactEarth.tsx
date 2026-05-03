'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const earthVertexShader = `
  precision mediump float;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  precision mediump float;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    // Continent noise
    float n = smoothNoise(vUv * 6.0) * 0.5 + smoothNoise(vUv * 12.0) * 0.3 + smoothNoise(vUv * 24.0) * 0.2;
    
    vec3 ocean = vec3(0.06, 0.12, 0.25);
    vec3 land = vec3(0.15, 0.28, 0.12);
    vec3 desert = vec3(0.35, 0.28, 0.12);
    
    vec3 surface = mix(ocean, mix(land, desert, smoothstep(0.5, 0.7, n)), smoothstep(0.35, 0.5, n));
    
    // Atmosphere rim
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
    surface += vec3(0.1, 0.3, 0.8) * fresnel * 0.6;
    
    // Night lights on dark side
    float light = dot(vNormal, normalize(vec3(1.0, 0.3, 0.5)));
    float nightSide = smoothstep(-0.2, 0.1, -light);
    surface += vec3(0.8, 0.6, 0.1) * nightSide * n * 0.3;
    
    gl_FragColor = vec4(surface, 1.0);
  }
`;

export function ContactEarth(): React.ReactElement {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const pinRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Points>(null);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 } }),
    []
  );

  const earthGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 4), []);
  const atmosphereGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.62, 4), []);
  const pinGeometry = useMemo(() => new THREE.ConeGeometry(0.05, 0.25, 8), []);

  const earthMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader,
        uniforms,
      }),
    [uniforms]
  );

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4488ff',
        transparent: true,
        opacity: 0.08,
        side: THREE.FrontSide,
      }),
    []
  );

  const pinMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c9a84c',
        emissive: '#c9a84c',
        emissiveIntensity: 0.5,
      }),
    []
  );

  // Stars
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 10;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const starGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    return geo;
  }, [starPositions]);

  const starMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#ffffff',
        size: 0.05,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  // India pin position (approx lat 20°N, lon 77°E)
  const pinPosition = useMemo(() => {
    const lat = (20 * Math.PI) / 180;
    const lon = (77 * Math.PI) / 180;
    const r = 1.55;
    return new THREE.Vector3(
      r * Math.cos(lat) * Math.cos(lon),
      r * Math.sin(lat),
      r * Math.cos(lat) * Math.sin(lon)
    );
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;
    if (earthRef.current) earthRef.current.rotation.y += 0.002;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += 0.002;
    if (pinRef.current) {
      pinRef.current.rotation.y += 0.002;
      pinRef.current.position.y = pinPosition.y + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <points ref={starsRef} geometry={starGeometry} material={starMaterial} />
      <mesh ref={earthRef} geometry={earthGeometry} material={earthMaterial} />
      <mesh ref={atmosphereRef} geometry={atmosphereGeometry} material={atmosphereMaterial} />
      <mesh
        ref={pinRef}
        geometry={pinGeometry}
        material={pinMaterial}
        position={pinPosition}
        rotation={[Math.PI, 0, 0]}
      />
      <pointLight color="#c9a84c" intensity={0.6} position={[3, 2, 3]} />
      <ambientLight intensity={0.15} />
    </group>
  );
}

export default ContactEarth;
