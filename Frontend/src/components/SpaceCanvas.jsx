import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';

const SpaceCanvas = () => {
    return (
        <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={200} size={3} speed={0.2} opacity={0.7} scale={10} color="#fff" />
                <Sparkles count={100} size={5} speed={0.3} opacity={0.5} scale={15} color="#8b5cf6" /> {/* Purple hints */}
            </Canvas>
        </div>
    );
};

export default SpaceCanvas;
