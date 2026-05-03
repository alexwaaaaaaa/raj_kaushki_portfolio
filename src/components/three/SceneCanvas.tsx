'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { DNAHelix } from './DNAHelix';
import { ParticleField } from './ParticleField';
import { GridFloor } from './GridFloor';
import { SkillSpheres } from './SkillSpheres';
import { ContactEarth } from './ContactEarth';
import { PostEffects } from './PostEffects';
import { LoadingScreen3D } from './LoadingScreen3D';
import { useThemeStore } from '@/store/themeStore';
import { isLowEndDevice, isMobile } from '@/lib/utils';

export type SceneVariant = 'hero' | 'about' | 'contact';

interface SceneCanvasProps {
  variant?: SceneVariant;
  className?: string;
}

function SceneFallback(): React.ReactElement {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
      }}
    />
  );
}

function LoadingFallback(): React.ReactElement {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(p + 8, 95)), 100);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0d0b14',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10,
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <LoadingScreen3D progress={progress} />
      </Canvas>
      <p style={{ position: 'absolute', bottom: '30%', color: '#7a7490', fontSize: 13, fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Initializing Experience...
      </p>
    </div>
  );
}

export function SceneCanvas({ variant = 'hero', className = '' }: SceneCanvasProps): React.ReactElement | null {
  const scene3D = useThemeStore((s) => s.theme.scene3D);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (scene3D.enabled && !isLowEndDevice()) {
      setCanRender(true);
    }
  }, [scene3D.enabled]);

  if (!canRender || isMobile()) {
    return <SceneFallback />;
  }

  return (
    <div className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
          gl={{
            antialias: false, // Turned off for massive performance gain, postprocessing handles it
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.25)); // Lower DPR for huge boost
            gl.toneMapping = 3; // ACESFilmicToneMapping
            gl.toneMappingExposure = 1.2;
          }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          {/* Lighting */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
          <pointLight position={[-5, 3, -5]} color="#7c6fcd" intensity={0.4} />

          {/* Scene variant content */}
          {variant === 'hero' && (
            <>
              {scene3D.particlesEnabled && <ParticleField />}
              {scene3D.helixEnabled && <DNAHelix />}
              {scene3D.gridEnabled && <GridFloor />}
            </>
          )}
          {variant === 'about' && <SkillSpheres />}
          {variant === 'contact' && scene3D.earthEnabled && <ContactEarth />}

          <PostEffects />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default SceneCanvas;
