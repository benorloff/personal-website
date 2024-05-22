"use client"

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Model } from './Ben-avatar'

export const Scene = () => {

    return (
        <Canvas
            style={{ height: "100%", width: "100%" }}
            camera={{
                position: [0, 0, 7.5],
                fov: 15,
            }}            
        >
            <ambientLight intensity={2} />
            <directionalLight position={[2, 1, 1]} />
            <Suspense fallback={null}>
                <Model position={[0,-0.2,-3]} />
            </Suspense>
            <OrbitControls enablePan={false} enableRotate={false} />
            <Environment preset="city" />
        </Canvas>
    )
}