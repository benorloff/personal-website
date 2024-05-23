"use client";

import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Model } from "@/components/model"
import { Overlay } from "@/components/overlay"

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
        <ambientLight intensity={1} />
        <Suspense fallback={null} >
          <Model scroll={scroll} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      {/* @ts-ignore */}
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  );
}
