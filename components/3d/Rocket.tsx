"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { COLORS } from "@/constants/colors";

export function Rocket() {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const flame2Ref = useRef<THREE.Mesh>(null);
  const flame3Ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const rocketRescue = useGameStore((state) => state.rocketRescue);
  const rocketPosition = useGameStore((state) => state.rocketPosition);

  useFrame((state) => {
    if (!groupRef.current || !rocketRescue) return;

    groupRef.current.position.set(
      rocketPosition[0],
      rocketPosition[1],
      rocketPosition[2]
    );

    const time = state.clock.elapsedTime;
    const wobble = Math.sin(time * 6) * 0.015;
    groupRef.current.rotation.z = wobble;
    groupRef.current.rotation.x = Math.sin(time * 4) * 0.01;

    if (flameRef.current) {
      const flicker = 1 + Math.sin(time * 50) * 0.3;
      flameRef.current.scale.set(flicker, 1.2 + Math.sin(time * 30) * 0.3, flicker);
    }
    if (flame2Ref.current) {
      const flicker2 = 1 + Math.sin(time * 45 + 1) * 0.25;
      flame2Ref.current.scale.set(flicker2, 1 + Math.sin(time * 35) * 0.2, flicker2);
    }
    if (flame3Ref.current) {
      const flicker3 = 0.8 + Math.sin(time * 55 + 2) * 0.2;
      flame3Ref.current.scale.setScalar(flicker3);
    }
    if (ringRef.current) {
      ringRef.current.rotation.y = time * 3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 2;
    }
  });

  if (!rocketRescue) return null;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.25, 0.8, 16]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive={COLORS.primary.cyan}
          emissiveIntensity={0.3}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial
          color="#000000"
          emissive={COLORS.primary.cyan}
          emissiveIntensity={2}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 1.3, 16]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.38, 0.03, 8, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive={COLORS.primary.cyan}
          emissiveIntensity={3}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.42, 0.02, 8, 32]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#aa00ff"
          emissiveIntensity={2}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.5, 0.35, 0.5, 16]} />
        <meshStandardMaterial
          color="#0f0f1f"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ringRef} position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshStandardMaterial
          color={COLORS.primary.cyan}
          emissive={COLORS.primary.cyan}
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 8, 32]} />
        <meshStandardMaterial
          color="#aa00ff"
          emissive="#aa00ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
          <mesh position={[0.45, -0.3, 0]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.08, 0.6, 0.25]} />
            <meshStandardMaterial
              color="#1a1a2e"
              emissive={COLORS.primary.cyan}
              emissiveIntensity={0.2}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0.5, -0.55, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive={COLORS.primary.cyan}
              emissiveIntensity={3}
            />
          </mesh>
        </group>
      ))}

      <mesh ref={flameRef} position={[0, -0.7, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.3, 1.5, 16]} />
        <meshStandardMaterial
          color={COLORS.primary.cyan}
          emissive={COLORS.primary.cyan}
          emissiveIntensity={5}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh ref={flame2Ref} position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.2, 1.2, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffff"
          emissiveIntensity={6}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh ref={flame3Ref} position={[0, -1.4, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.1, 0.6, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={8}
          transparent
          opacity={0.95}
        />
      </mesh>

      <pointLight position={[0, -1, 0]} color={COLORS.primary.cyan} intensity={15} distance={15} />
      <pointLight position={[0, 0.5, 0]} color="#aa00ff" intensity={3} distance={6} />
      <pointLight position={[0, 1.5, 0]} color={COLORS.primary.cyan} intensity={2} distance={4} />
    </group>
  );
}
