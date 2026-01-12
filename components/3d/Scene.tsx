"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { World } from "./World";
import { Suspense, useRef, useState, useEffect } from "react";
import { COLORS } from "@/constants/colors";
import { useGameStore } from "@/store/gameStore";

function CameraAnimation() {
  const { camera } = useThree();
  const [isAnimating, setIsAnimating] = useState(true);
  const startTime = useRef(0);
  const shouldReplayIntro = useGameStore((state) => state.shouldReplayIntro);
  const resetIntroReplay = useGameStore((state) => state.resetIntroReplay);

  useEffect(() => {
    if (shouldReplayIntro) {
      camera.position.set(0, 80, 100);
      startTime.current = 0;
      setIsAnimating(true);
      resetIntroReplay();
    }
  }, [shouldReplayIntro, camera, resetIntroReplay]);

  useFrame((state) => {
    if (!isAnimating) return;

    if (startTime.current === 0) {
      startTime.current = state.clock.getElapsedTime();
    }

    const elapsed = state.clock.getElapsedTime() - startTime.current;
    const duration = 2.0;

    if (elapsed < duration) {
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 4);

      const startY = 80;
      const endY = 1.8;
      const startZ = 100;
      const endZ = 12;

      const targetY = startY + (endY - startY) * eased;
      const targetZ = startZ + (endZ - startZ) * eased;

      camera.position.set(0, targetY, targetZ);
      camera.lookAt(0, 1, 6);
    } else {
      setIsAnimating(false);
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
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <Suspense fallback={null}>
          <CameraAnimation />
          <World />
          <Avatar />
          <Stars radius={150} depth={150} count={25000} factor={8} saturation={0} fade speed={1} />
          <Stars radius={100} depth={100} count={15000} factor={5} saturation={0} fade speed={0.5} />
          <Stars radius={50} depth={50} count={8000} factor={3} saturation={0} fade speed={0.3} />
          <Sparkles count={5000} scale={80} size={4} speed={0.3} opacity={0.9} color={COLORS.primary.cyan} />
          <Sparkles count={4000} scale={70} size={3} speed={0.4} opacity={0.8} color={COLORS.primary.skyBlue} />
          <Sparkles count={3500} scale={60} size={2.5} speed={0.5} opacity={0.7} color={COLORS.white.base} />
          <Sparkles count={3000} scale={50} size={2} speed={0.3} opacity={0.6} color={COLORS.primary.cyan} />
          <Sparkles count={2500} scale={40} size={1.5} speed={0.4} opacity={0.5} color={COLORS.primary.skyBlue} />
          <Sparkles count={2000} scale={30} size={1} speed={0.2} opacity={0.4} color={COLORS.white.base} />
          <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={5} maxDistance={20} />
        </Suspense>
      </Canvas>
    </div>
  );
}
