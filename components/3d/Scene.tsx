"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { World } from "./World";
import { Suspense, useRef, useState } from "react";
import { COLORS } from "@/constants/colors";

function CameraAnimation() {
  const { camera } = useThree();
  const [hasAnimated, setHasAnimated] = useState(false);
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (hasAnimated) return;

    const elapsed = (Date.now() - startTime.current) / 1000;
    const duration = 3.5;

    if (elapsed < duration) {
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 4);

      const startY = 80;
      const endY = 8;
      const startZ = 100;
      const endZ = 10;

      camera.position.y = startY + (endY - startY) * eased;
      camera.position.z = startZ + (endZ - startZ) * eased;
      camera.lookAt(0, 0, 0);
    } else {
      setHasAnimated(true);
    }
  });

  return null;
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        shadows
        camera={{ position: [0, 80, 100], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[COLORS.background.darkest]} />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
        />

        <Suspense fallback={null}>
          <CameraAnimation />
          <World />
          <Avatar />
          <Stars radius={150} depth={80} count={25000} factor={6} saturation={0} fade speed={1} />
          <Stars radius={100} depth={60} count={15000} factor={4} saturation={0} fade speed={0.5} />
          <Sparkles count={800} scale={20} size={3} speed={0.3} opacity={0.8} color={COLORS.primary.cyan} />
          <Sparkles count={400} scale={15} size={1.5} speed={0.5} opacity={0.6} color={COLORS.primary.skyBlue} />
          <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={5} maxDistance={20} />
        </Suspense>
      </Canvas>
    </div>
  );
}
