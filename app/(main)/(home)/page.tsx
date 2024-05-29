"use client";

import { 
  Suspense, 
  useEffect, 
  useRef, 
  useState 
} from "react"
import { BlendFunction } from "postprocessing"
import { Canvas } from "@react-three/fiber"
import { useTheme } from "next-themes";
import * as THREE from "three"
import { 
  EffectComposer, 
  Bloom, 
  Noise, 
  ChromaticAberration 
} from "@react-three/postprocessing"
import { 
  Environment, 
  Html, 
  OrbitControls, 
  useProgress 
} from "@react-three/drei"

import { Theme, themeColors, themeModeAndColor } from "@/lib/themes";
import { Progress } from "@/components/ui/progress";
import { Model } from "@/components/model"

export default function Home() {
  const scroll = useRef(0)
  const { theme } = useTheme();
  const [sceneColor, setSceneColor] = useState("#000000")

  const [mounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const { color } = themeModeAndColor(theme as Theme);
    const colorProps = themeColors.find((c) => c.name === color);
    if (colorProps) {
      setSceneColor(colorProps.colors.default);
    }
  }, [theme])

  if (!mounted || !theme) return null

  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress()
    console.log(progress, 'progress')
    return (
      <Html center className="text-4xl">
        Igniting boosters...
        <Progress value={progress} />
      </Html>
    )
  }

  // Consider adding face controls to the model
  // https://github.com/pmndrs/drei?tab=readme-ov-file#facecontrols
  // Will require user opts in to camera access

  return (
    <>
      {/* @ts-ignore */}
      <Canvas shadows eventSource={document.getElementById("frameInner")} eventPrefix="client">
        <Suspense fallback={<Loader />} >
          <ambientLight intensity={1} color={new THREE.Color('white')} />
          <pointLight intensity={50} position={[0, 0, 0]} decay={1.5} color={new THREE.Color('white')} />
          <Model scroll={scroll} color={sceneColor} />
          <Environment preset="night" />
          <EffectComposer>
            <Noise premultiply blendFunction={BlendFunction.ADD} />
            <Bloom opacity={0.2} intensity={0.1} />
            <ChromaticAberration radialModulation={false} modulationOffset={2} />
          </EffectComposer>
          <OrbitControls maxDistance={25} minDistance={1} enablePan={false} />
        </Suspense>
      </Canvas>
    </>
  );
}
