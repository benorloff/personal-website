import { Center, PerspectiveCamera, Select, Text3D, useAnimations, useCursor, useGLTF } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    Waves: THREE.MeshPhysicalMaterial,
    Rings: THREE.MeshPhysicalMaterial,
    Inside: THREE.MeshPhysicalMaterial,
    Core: THREE.MeshStandardMaterial,
    InsideActive: THREE.MeshStandardMaterial,
    GlossBlack: THREE.MeshStandardMaterial,
    MatteWhite: THREE.MeshStandardMaterial,
  }
  animations: GLTFAction[]
}

type ActionName = 
    | 'MainAnim' 
    | 'Sphere1Anim' 
    | 'Sphere2Anim' 
    | 'Sphere3Anim' 
    | 'Sphere4Anim' 
    | 'ParticlesAnim'
    | 'NucleusAnim'
    | 'AstronautAnim'
    | 'StationAnim'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

export function Model({ 
    scroll, 
    color,
    props 
}: { 
    scroll: MutableRefObject<number>, 
    color: string,
    props?: JSX.IntrinsicElements['group']
}) {

    const group = useRef<THREE.Group>(null)
    const spheres = useRef<THREE.Group>(null)
    const nucleus = useRef<THREE.Group>(null)
    const particles = useRef<THREE.Group>(null)
    const { nodes, materials, animations } = useGLTF('/model.glb') as GLTFResult
    const { actions } = useAnimations<GLTFAction>(animations, group)
    const [hovered, setHovered] = useState<boolean>(false)
    const [selected, setSelected] = useState<THREE.Object3D<THREE.Object3DEventMap>[]>([]);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // Play all animations on mount
    useEffect(() => void (
        Object.keys(actions).forEach((key) => actions[key as ActionName]!.play())
    ), [])

    useEffect(() => {
        console.log(hovered, 'hovered')
    }, [hovered])

    // Change color of the nucleus and spheres on theme color change
    useEffect(() => {
        if (nucleus.current) {
            // @ts-ignore
            nucleus.current.children[3].material.color = (new THREE.Color('white'))
        }
        spheres.current?.children.forEach((sphere) => {
            // @ts-ignore
            sphere.children[0].material.color = (new THREE.Color(color))
        })
        particles.current?.children.forEach((particle) => {
            // @ts-ignore
            particle.material.color = (new THREE.Color(color))
        })
    }, [color])

    // Executed on every rendered frame (frequency depends on native refresh rate)
    // Recevies the state and clock delta 
    useFrame((state) => {
        // If using scroll-linked animation, use the pattern below
        // actions["MainAnim"]!.time = THREE.MathUtils.lerp(actions["MainAnim"]!.time, actions["MainAnim"]!.getClip().duration * scroll.current, 0.05)
        
        // When paused, stop the main animation and speed up the particles animation
        if (isPaused) {
            actions.MainAnim!.play().timeScale = THREE.MathUtils.lerp(actions.MainAnim!.play().getEffectiveTimeScale(), 0, 0.05);
            actions.ParticlesAnim!.play().timeScale = THREE.MathUtils.lerp(actions.ParticlesAnim!.play().getEffectiveTimeScale(), 5, 0.05);
        } else {
            actions.MainAnim!.play().timeScale = THREE.MathUtils.lerp(actions.MainAnim!.play().getEffectiveTimeScale(), 1, 0.05);
            actions.ParticlesAnim!.play().timeScale = THREE.MathUtils.lerp(actions.ParticlesAnim!.play().getEffectiveTimeScale(), 1, 0.05);;
        }

        // actions.NucleusAnim!.play().paused = isPaused;
    })

    useCursor(hovered)


    return (
        <group ref={group} {...props} dispose={null}>
            <group name="HomeScene">
                <group name="Model" 
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <group name="Main" 
                        scale={0.25}
                    >
                        <Center position={[0,-45,0]} rotation={[1.5,0,0]}>
                                <Text3D
                                    curveSegments={32}
                                    bevelEnabled
                                    bevelSize={0.04}
                                    height={0.5}
                                    lineHeight={0.55}
                                    letterSpacing={-0.06}
                                    size={1.5}
                                    font="/Inter_Bold.json"
                                >
                                    {`Creative\nDeveloper`}
                                    <meshNormalMaterial />
                                </Text3D>
                        </Center>
                        <group name="_SpaceStation" 
                            position={[-11.855, 9.914, 4.498]} 
                            scale={0.006}
                        >
                            <mesh
                                name="Beams"
                                castShadow
                                receiveShadow
                                geometry={nodes.Beams.geometry}
                                material={materials.GlossBlack}
                                position={[0, 0, 219.252]}
                                scale={42.202}
                            />
                            <mesh
                                name="Command_Module"
                                castShadow
                                receiveShadow
                                geometry={nodes.Command_Module.geometry}
                                material={materials.MatteWhite}
                                position={[0, 42.202, 331.068]}
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={42.202}
                            />
                            <mesh
                                name="Main_Ring"
                                castShadow
                                receiveShadow
                                geometry={nodes.Main_Ring.geometry}
                                material={materials.MatteWhite}
                                position={[0, 0, 224.984]}
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={42.202}
                            />
                            <mesh
                                name="Bulk"
                                castShadow
                                receiveShadow
                                geometry={nodes.Bulk.geometry}
                                material={materials.MatteWhite}
                                position={[0, 32.446, 224.613]}
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={42.202}
                            />
                            <mesh
                                name="Lights"
                                castShadow
                                receiveShadow
                                geometry={nodes.Lights.geometry}
                                material={materials.Rings}
                                position={[0, 0, 265.077]}
                                scale={42.202}
                            />
                            <mesh
                                name="Frames"
                                castShadow
                                receiveShadow
                                geometry={nodes.Frames.geometry}
                                material={materials.GlossBlack}
                                position={[-4.302, -7.273, 0]}
                                scale={42.202}
                            />
                        </group>
                        <group name="_Astronaut" 
                            scale={0.004}
                        >
                            <group name="Astronaut"
                                position={[3000, 11.654, -42.785]}
                                rotation={[0, 0, -Math.PI / 2]}
                                scale={0.469}
                            >
                                <mesh
                                    name="Features"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Features.geometry}
                                    material={materials.Rings}
                                    position={[0, -80.033, 310.973]}
                                    scale={1.919}
                                />
                                <mesh
                                    name="Pads"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Pads.geometry}
                                    material={materials.Rings}
                                    position={[0, -22.506, 107.853]}
                                    scale={1.919}
                                />
                                <mesh
                                    name="Lining"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Lining.geometry}
                                    material={materials.Rings}
                                    position={[0, -44.158, 188.106]}
                                    scale={1.919}
                                />
                                <mesh
                                    name="Visor"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Visor.geometry}
                                    material={materials.GlossBlack}
                                    position={[0, -85.753, 312.982]}
                                    scale={1.919}
                                />
                                <mesh
                                    name="Helmet"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Helmet.geometry}
                                    material={materials.MatteWhite}
                                    position={[0, -6.217, 292.368]}
                                    scale={1.919}
                                />
                                <mesh
                                    name="Main_1"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Main_1.geometry}
                                    material={materials.MatteWhite}
                                    position={[0, -77.14, 88.43]}
                                    scale={1.919}
                                />
                            </group>
                        </group>
                        <group name="_Nucleus" 
                            scale={0.004}
                        >
                            <mesh
                                name="Sphere"
                                castShadow
                                receiveShadow
                                geometry={nodes.Sphere.geometry}
                                material={materials.Waves}
                                position={[0, 0, -1500]}
                                scale={30}
                                onPointerEnter={() => setIsPaused((isPaused) => !isPaused)}
                            />
                            <group ref={nucleus} name="Nucleus" 
                                position={[0, 0, -1000]} 
                                scale={[0.868, 0.822, 0.939]}
                            >
                                <mesh
                                    name="Ring"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Ring.geometry}
                                    material={materials.Inside}
                                    position={[-28.191, -64.692, 1021.605]}
                                    rotation={[-2.953, 0, 0]}
                                    scale={1000}
                                />
                                <mesh
                                    name="Ring1"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Ring1.geometry}
                                    material={materials.Inside}
                                    position={[-28.191, -64.692, 1021.605]}
                                    rotation={[0, -1.288, 0]}
                                    scale={1000}
                                />
                                <mesh
                                    name="Ring2"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Ring2.geometry}
                                    material={materials.Inside}
                                    position={[-28.191, -64.692, 1021.605]}
                                    rotation={[0, 0, 2.953]}
                                    scale={1000}
                                />
                                <motion.mesh
                                    name="Core"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Core.geometry}
                                    material={materials.Core}
                                    position={[22.764, -64.692, 1055.604]}
                                    scale={500}
                                    initial={{ opacity: 0.5 }}
                                    animate={{ scale: [500,250], opacity: 1 }}
                                    transition={{ type: 'tween', ease: 'easeInOut', repeat: Infinity, duration: 1, repeatType: "reverse" }}
                                />
                            </group>
                        </group>
                        <group ref={spheres} name="_Spheres">
                            <motion.group
                                name="Sphere1"
                                position={[0, -19.942, 0]}
                                rotation={[Math.PI / 2, 0, -1.005]}
                                scale={0.031}
                                animate={isPaused ? { scale: 0.05 } : { scale: 0.031 }}
                                transition={{ type: "tween", duration: 0.5, ease: "backInOut"}}
                            >
                                <mesh
                                name="Rings"
                                castShadow
                                receiveShadow
                                geometry={nodes.Rings.geometry}
                                material={materials.Rings}
                                position={[0, 0, 0.11]}
                                rotation={[Math.PI / 2, 0, 0]}
                                />
                                <group name="InsideVariants" position={[0, 0, -649.145]}>
                                    <mesh
                                        name="Active"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Active.geometry}
                                        material={materials.InsideActive}
                                        position={[0, 0, 649.255]}
                                        rotation={[Math.PI / 2, 0, 0]}
                                    />
                                    <mesh
                                        name="Inactive"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Inactive.geometry}
                                        material={materials.Inside}
                                        position={[0, 0, 649.255]}
                                        rotation={[Math.PI / 2, 0, 0]}
                                    />
                                </group>
                            </motion.group>
                            <motion.group
                                name="Sphere2"
                                position={[20, 0, 0]}
                                rotation={[0, Math.PI / 2, 0]}
                                scale={0.031}
                                animate={isPaused ? { scale: 0.05 } : { scale: 0.031 }}
                                transition={{ type: "tween", duration: 0.5, ease: "backInOut"}}
                            >
                                <mesh
                                    name="Rings_1"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Rings_1.geometry}
                                    material={materials.Rings}
                                    position={[0, 0, 0.11]}
                                    rotation={[Math.PI / 2, 0, 0]}
                                />
                                <group name="InsideVariants_1" position={[0, 0, -649.041]}>
                                    <mesh
                                        name="Active_1"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Active_1.geometry}
                                        material={materials.InsideActive}
                                        position={[0, 0, 649.255]}
                                        rotation={[Math.PI / 2, 0, 0]}
                                    />
                                    <mesh
                                        name="Inactive_1"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Inactive_1.geometry}
                                        material={materials.Inside}
                                        position={[0, 0, 649.255]}
                                        rotation={[Math.PI / 2, 0, 0]}
                                    />
                                </group>
                            </motion.group>
                            <motion.group
                                name="Sphere3"
                                position={[0, 20, 0]}
                                rotation={[-Math.PI / 2, 0, -0.754]}
                                scale={0.031}
                                animate={isPaused ? { scale: 0.05 } : { scale: 0.031 }}
                                transition={{ type: "tween", duration: 0.5, ease: "backInOut"}}
                            >
                                <mesh
                                name="Rings_2"
                                castShadow
                                receiveShadow
                                geometry={nodes.Rings_2.geometry}
                                material={materials.Rings}
                                position={[0, 0, 0.11]}
                                rotation={[Math.PI / 2, 0, 0]}
                                />
                                <group name="InsideVariants_2" position={[0, 0, -649.041]}>
                                <mesh
                                    name="Active_2"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Active_2.geometry}
                                    material={materials.InsideActive}
                                    position={[0, 0, 649.255]}
                                    rotation={[Math.PI / 2, 0, 0]}
                                />
                                <mesh
                                    name="Inactive_2"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Inactive_2.geometry}
                                    material={materials.Inside}
                                    position={[0, 0, 649.255]}
                                    rotation={[Math.PI / 2, 0, 0]}
                                />
                                </group>
                            </motion.group>
                            <motion.group
                                name="Sphere4"
                                position={[-20, 0, 0]}
                                rotation={[0, -Math.PI / 2, 0]}
                                scale={0.031}
                                animate={isPaused ? { scale: 0.05 } : { scale: 0.031 }}
                                transition={{ type: "tween", duration: 0.5, ease: "backInOut"}}
                            >
                                <mesh
                                name="Rings_3"
                                castShadow
                                receiveShadow
                                geometry={nodes.Rings_3.geometry}
                                material={materials.Rings}
                                position={[0, 0, 0.11]}
                                rotation={[Math.PI / 2, 0, 0]}
                                />
                                <group name="InsideVariants_3" position={[0, 0, -649.041]}>
                                <mesh
                                    name="Active_3"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Active_3.geometry}
                                    material={materials.InsideActive}
                                    position={[0, 0, 649.255]}
                                    rotation={[Math.PI / 2, 0, 0]}
                                />
                                <mesh
                                    name="Inactive_3"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Inactive_3.geometry}
                                    material={materials.Inside}
                                    position={[0, 0, 649.255]}
                                    rotation={[Math.PI / 2, 0, 0]}
                                />
                                </group>
                            </motion.group>
                        </group>
                    </group>
                <group ref={particles} name="Particles" 
                    scale={0.25}
                >
                    <mesh
                    name="Particle"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle.geometry}
                    material={materials.Waves}
                    position={[9.54, 33.243, -34.974]}
                    rotation={[-1.044, 0.25, 0.016]}
                    scale={0.014}
                    />
                    <mesh
                    name="Particle_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_1.geometry}
                    material={materials.Waves}
                    position={[39.63, 11.512, 8.672]}
                    rotation={[1.557, 0.203, -1.138]}
                    scale={0.045}
                    />
                    <mesh
                    name="Particle_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_2.geometry}
                    material={materials.Waves}
                    position={[32.415, 45.55, 61.279]}
                    rotation={[-0.997, -0.026, -0.19]}
                    scale={0.025}
                    />
                    <mesh
                    name="Particle_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_3.geometry}
                    material={materials.Waves}
                    position={[-51.995, 24.103, 4.769]}
                    rotation={[0.357, 0.401, 1.693]}
                    scale={0.025}
                    />
                    <mesh
                    name="Particle_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_4.geometry}
                    material={materials.Waves}
                    position={[41.556, -16.226, 53.207]}
                    rotation={[-1.96, 1.089, 0.415]}
                    scale={0.024}
                    />
                    <mesh
                    name="Particle_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_5.geometry}
                    material={materials.Waves}
                    position={[11.577, 0.487, 28.046]}
                    rotation={[0.933, -0.748, -0.879]}
                    scale={0.026}
                    />
                    <mesh
                    name="Particle_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_6.geometry}
                    material={materials.Waves}
                    position={[25.988, -6.531, 12.782]}
                    rotation={[1.457, 0.551, -0.273]}
                    scale={0.03}
                    />
                    <mesh
                    name="Particle_7"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_7.geometry}
                    material={materials.Waves}
                    position={[-22.401, 63.002, -68.953]}
                    rotation={[1.861, 0.955, -1.563]}
                    scale={0.017}
                    />
                    <mesh
                    name="Particle_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_8.geometry}
                    material={materials.Waves}
                    position={[40.032, -22.912, 12.898]}
                    rotation={[-2.198, 1.183, 3.018]}
                    scale={0.018}
                    />
                    <mesh
                    name="Particle_9"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_9.geometry}
                    material={materials.Waves}
                    position={[14.487, 111.409, -25.464]}
                    rotation={[-0.09, -0.01, 0.023]}
                    scale={0.004}
                    />
                    <mesh
                    name="Particle_10"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_10.geometry}
                    material={materials.Waves}
                    position={[98.333, 2.668, -17.702]}
                    rotation={[2.643, 0.477, -1.748]}
                    scale={0.027}
                    />
                    <mesh
                    name="Particle_11"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_11.geometry}
                    material={materials.Waves}
                    position={[29.447, 12.938, -82.005]}
                    rotation={[1.823, -0.784, -2.391]}
                    scale={0.031}
                    />
                    <mesh
                    name="Particle_12"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_12.geometry}
                    material={materials.Waves}
                    position={[36.458, -26.174, 2.19]}
                    rotation={[-2.524, -0.786, 3.141]}
                    scale={0.026}
                    />
                    <mesh
                    name="Particle_13"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_13.geometry}
                    material={materials.Waves}
                    position={[3.9, -6.409, -6.682]}
                    rotation={[3.052, -1.092, 0.286]}
                    scale={[-0.003, 0.003, 0.003]}
                    />
                    <mesh
                    name="Particle_14"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_14.geometry}
                    material={materials.Waves}
                    position={[-23.65, -34.854, 7.301]}
                    rotation={[3.135, 0.777, -1.803]}
                    scale={0.031}
                    />
                    <mesh
                    name="Particle_15"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_15.geometry}
                    material={materials.Waves}
                    position={[-6.486, 9.114, 41.203]}
                    rotation={[-2.869, -0.736, 2.554]}
                    scale={0.016}
                    />
                    <mesh
                    name="Particle_16"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_16.geometry}
                    material={materials.Waves}
                    position={[38.672, 28.391, 33.451]}
                    rotation={[2.168, -1.297, -2.669]}
                    scale={0.01}
                    />
                    <mesh
                    name="Particle_17"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_17.geometry}
                    material={materials.Waves}
                    position={[59.292, 56.11, -18.504]}
                    rotation={[2.716, -1.356, 1.504]}
                    scale={0.024}
                    />
                    <mesh
                    name="Particle_18"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_18.geometry}
                    material={materials.Waves}
                    position={[-49.046, 6.504, 19.666]}
                    rotation={[-3.035, 0.231, 2.159]}
                    scale={0.031}
                    />
                    <mesh
                    name="Particle_19"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_19.geometry}
                    material={materials.Waves}
                    position={[11.313, 10.959, -37.718]}
                    rotation={[2.577, 0.356, 1.848]}
                    scale={0.03}
                    />
                    <mesh
                    name="Particle_20"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_20.geometry}
                    material={materials.Waves}
                    position={[-72.888, 13.747, -17.299]}
                    rotation={[-2.418, -0.216, 2.734]}
                    scale={0.025}
                    />
                    <mesh
                    name="Particle_21"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_21.geometry}
                    material={materials.Waves}
                    position={[-50.379, -15.396, 31.195]}
                    rotation={[-1.51, -1.226, -0.685]}
                    scale={0.028}
                    />
                    <mesh
                    name="Particle_22"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_22.geometry}
                    material={materials.Waves}
                    position={[6.945, -28.943, -24.523]}
                    rotation={[-0.075, -0.114, 0.025]}
                    scale={0.037}
                    />
                    <mesh
                    name="Particle_23"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_23.geometry}
                    material={materials.Waves}
                    position={[-38.51, -9.182, -4.432]}
                    rotation={[1.947, -0.927, 2.546]}
                    scale={0.023}
                    />
                    <mesh
                    name="Particle_24"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_24.geometry}
                    material={materials.Waves}
                    position={[-9.1, -60.054, -0.807]}
                    rotation={[-2.266, -0.196, -1.9]}
                    scale={0.022}
                    />
                    <mesh
                    name="Particle_25"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_25.geometry}
                    material={materials.Waves}
                    position={[-66.284, -44.792, -40.327]}
                    rotation={[2.455, -1.137, 1.538]}
                    scale={0.026}
                    />
                    <mesh
                    name="Particle_26"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_26.geometry}
                    material={materials.Waves}
                    position={[-69.469, 34.031, 19.059]}
                    rotation={[2.094, -0.959, 2.96]}
                    scale={0.02}
                    />
                    <mesh
                    name="Particle_27"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_27.geometry}
                    material={materials.Waves}
                    position={[-34.922, -25.928, 36.295]}
                    rotation={[0.159, -1.319, -0.528]}
                    scale={0.038}
                    />
                    <mesh
                    name="Particle_28"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_28.geometry}
                    material={materials.Waves}
                    position={[24.42, 7.146, -49.647]}
                    rotation={[2.28, -0.737, 3.105]}
                    scale={0.019}
                    />
                    <mesh
                    name="Particle_29"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_29.geometry}
                    material={materials.Waves}
                    position={[-26.111, 85.069, 31.86]}
                    rotation={[-0.42, -0.809, -0.556]}
                    scale={0.015}
                    />
                    <mesh
                    name="Particle_30"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_30.geometry}
                    material={materials.Waves}
                    position={[-43.562, -13.355, 46.646]}
                    rotation={[0.784, -0.55, 1.696]}
                    scale={0.025}
                    />
                    <mesh
                    name="Particle_31"
                    castShadow
                    receiveShadow
                    geometry={nodes.Particle_31.geometry}
                    material={materials.Waves}
                    position={[-28.516, -15.771, -1.057]}
                    rotation={[0.733, 0.29, 0.053]}
                    scale={0.035}
                    />
                </group>
            </group>
            <PerspectiveCamera
                name="Camera"
                makeDefault
                far={400}
                near={0.04}
                fov={45}
                position={[0, 0, 15]}
            />
        </group>
    </group>
    )
}

useLoader.preload(GLTFLoader, '/model.glb')