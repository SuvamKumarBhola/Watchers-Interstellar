import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Astronaut = () => {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.z = Math.sin(t / 2) / 10;
        group.current.rotation.y = Math.sin(t / 4) / 10;
    });

    const material = new THREE.MeshStandardMaterial({ color: 'white', roughness: 0.3, metalness: 0.1 });
    const visorMaterial = new THREE.MeshStandardMaterial({ color: '#111', roughness: 0.1, metalness: 0.9 });
    const suitAccent = new THREE.MeshStandardMaterial({ color: '#6d28d9', roughness: 0.3 }); // Purple accent

    return (
        <group ref={group} dispose={null} scale={1.5} rotation={[0.2, -0.5, 0]}>
            {/* Head */}
            <mesh position={[0, 1.5, 0]} material={material}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
            </mesh>
            {/* Visor */}
            <mesh position={[0, 1.5, 0.35]} material={visorMaterial}>
                <boxGeometry args={[0.6, 0.4, 0.2]} />
            </mesh>

            {/* Body */}
            <mesh position={[0, 0.2, 0]} material={material}>
                <boxGeometry args={[1, 1.5, 0.6]} />
            </mesh>
            {/* Backpack */}
            <mesh position={[0, 0.4, -0.4]} material={material}>
                <boxGeometry args={[0.8, 1.2, 0.4]} />
            </mesh>
            {/* Chest Control Panel */}
            <mesh position={[0, 0.4, 0.31]} material={suitAccent}>
                <planeGeometry args={[0.4, 0.3]} />
            </mesh>

            {/* Right Arm */}
            <mesh position={[0.7, 0.8, 0]} rotation={[0, 0, -0.5]} material={material}>
                <boxGeometry args={[0.3, 0.8, 0.3]} />
            </mesh>
            <mesh position={[0.9, 0.2, 0]} rotation={[0, 0, -0.2]} material={material}>
                <boxGeometry args={[0.25, 0.6, 0.25]} />
            </mesh>

            {/* Left Arm (Waving/Floating) */}
            <mesh position={[-0.7, 0.8, 0]} rotation={[0, 0, 0.5]} material={material}>
                <boxGeometry args={[0.3, 0.8, 0.3]} />
            </mesh>
            <mesh position={[-0.9, 1.3, 0.2]} rotation={[0, 0, -0.5]} material={material}>
                <boxGeometry args={[0.25, 0.6, 0.25]} />
            </mesh>


            {/* Right Leg */}
            <mesh position={[0.3, -0.9, 0]} material={material}>
                <boxGeometry args={[0.35, 1, 0.35]} />
            </mesh>
            <mesh position={[0.3, -1.6, 0.1]} rotation={[-0.2, 0, 0]} material={material}>
                <boxGeometry args={[0.32, 0.6, 0.32]} />
            </mesh>

            {/* Left Leg */}
            <mesh position={[-0.3, -0.9, 0]} material={material} rotation={[0.1, 0, 0]}>
                <boxGeometry args={[0.35, 1, 0.35]} />
            </mesh>
            <mesh position={[-0.3, -1.6, 0.1]} rotation={[-0.3, 0, 0]} material={material}>
                <boxGeometry args={[0.32, 0.6, 0.32]} />
            </mesh>
        </group>
    );
};

const AstronautCanvas = () => {
    return (
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6d28d9" /> {/* Purple glow */}

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <Astronaut />
                </Float>

                <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} far={10} />
            </Canvas>
        </div>
    );
};

export default AstronautCanvas;
