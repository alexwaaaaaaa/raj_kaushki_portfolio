'use client';

import React from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useThemeStore } from '@/store/themeStore';
import * as THREE from 'three';

export function PostEffects(): React.ReactElement {
  const scene3D = useThemeStore((s) => s.theme.scene3D);

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={scene3D.bloomStrength}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}

export default PostEffects;
