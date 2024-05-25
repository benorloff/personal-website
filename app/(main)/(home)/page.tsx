"use client";

import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Model } from "@/components/model2"
import { Overlay } from "@/components/overlay"
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"

export default function Home() {
  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)

  const [mounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* @ts-ignore */}
      <Canvas shadows eventSource={document.getElementById("frameInner")} eventPrefix="client">
        <ambientLight intensity={10} color={new THREE.Color(0x33F20D)} />
        <Suspense fallback={null} >
          <Model scroll={scroll} />
          <Environment preset="city" />
        </Suspense>
        <EffectComposer>
          <Noise premultiply blendFunction={BlendFunction.MULTIPLY} />
          <Bloom luminanceSmoothing={0.9} luminanceThreshold={0.3} />
          <ChromaticAberration radialModulation={false} modulationOffset={2} />
        </EffectComposer>
      </Canvas>
      {/* @ts-ignore */}
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  );
}
