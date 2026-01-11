"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { World } from "./World";
import { Suspense } from "react";

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#111"]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
        />
        
        <Suspense fallback={null}>
          <World />
          <Avatar />
          <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.6} color="#4fd1c5" />
          <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={5} maxDistance={20} />
        </Suspense>
      </Canvas>
    </div>
  );
}
