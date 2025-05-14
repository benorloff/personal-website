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
  useProgress,
  CameraShake,
  Stars,
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
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <CameraShake
              maxYaw={0.05}
              maxPitch={0.05}
              maxRoll={0.05}
              yawFrequency={0.05}
              pitchFrequency={0.05}
              rollFrequency={0.05}
              intensity={1}
              decayRate={0.65}
            />
          </EffectComposer>
          <OrbitControls maxDistance={25} minDistance={1} enablePan={false} makeDefault />
        </Suspense>
      </Canvas>
      {/* HUD for instructions */}
      <div 
        className="absolute top-24 left-24 text-xs p-4 m-1 pointer-events-none z-10"
        style={{ color: sceneColor }}
      >
        <p>Scroll to zoom</p>
        <p>Click and drag to rotate</p>
        <p>Press CMD+K for controls</p>
      </div>
      {/* Corner borders */}
      <div className="absolute w-full h-full top-0 left-0 p-10 pointer-events-none">
        <div>
          <div className="absolute w-12 h-12 top-0 left-0 border-2 border-muted-foreground border-r-0 border-b-0 m-10 lg:m-24" />
          <div className="absolute w-12 h-12 top-0 right-0 border-2 border-muted-foreground border-l-0 border-b-0 m-10 lg:m-24" />
          <div className="absolute w-12 h-12 bottom-0 left-0 border-2 border-muted-foreground border-r-0 border-t-0 m-10 lg:m-24" />
          <div className="absolute w-12 h-12 bottom-0 right-0 border-2 border-muted-foreground border-l-0 border-t-0 m-10 lg:m-24" />
        </div>
        {/* <div className="flex text-sm text-accent p-24">
          Location: Unknown<br />
          Mission: Investigate the anomalous energy signatures.<br />
          Proceed with caution.
          Coordinates:
          Galactic Coordinates: X: 327.85 | Y: -142.67 | Z: 589.21
          Local Coordinates: X: 15.92 | Y: 78.45 | Z: -23.18
          Scanner Data:
          Sphere 1: Energy Output: 8.7 PetaWatts | Composition: Unknown Elements
          Sphere 2: Energy Output: 12.3 PetaWatts | Composition: Exotic Matter
          Sphere 3: Energy Output: 6.1 PetaWatts | Composition: Quantum Entangled Particles
          Pulsating Object Details:
          Classification: Neutron Star Remnant
          Mass: 2.7 Solar Masses
          Rotation Period: 1.3 milliseconds
          Magnetic Field Strength: 10^12 Gauss
          Ship Status:
          Fuel: 87% | Hull Integrity: 100% | Shields: 95%
          Life Support: Optimal | Gravity: Earth-like
          Communications: Long-Range Sensors Active
          Anomaly Readings:
          Gravitational Distortion: +0.8 milli-G
          Tachyon Emissions: 4.2 x 10^6 particles/second
          Dark Matter Density: 1.5 x 10^-27 g/cm³
          Mission Objectives:

          Scan and analyze the composition of the mysterious spheres
          Monitor the pulsating object for any changes in energy output
          Collect samples of exotic matter for further study
          Investigate the source of the anomalous energy signatures


          Time Dilation:
          Mission Elapsed Time: 72 hours, 15 minutes
          Earth Elapsed Time: 6 months, 5 days, 12 hours  
          </div> */}
      </div>
    </>
  );
}
