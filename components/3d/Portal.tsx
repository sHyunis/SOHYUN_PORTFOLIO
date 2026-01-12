"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { avatarPosition } from "@/store/avatarPosition";

const PORTAL_POSITION: [number, number, number] = [0, 0, 0];
const INTERACTION_DISTANCE = 2.5;

export function Portal() {
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const wasInPortalRef = useRef(false);

  const setActiveSection = useGameStore((state) => state.setActiveSection);
  const activeSection = useGameStore((state) => state.activeSection);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.8;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.3;
    }

    const distance = Math.sqrt(
      Math.pow(avatarPosition.x - PORTAL_POSITION[0], 2) +
      Math.pow(avatarPosition.z - PORTAL_POSITION[2], 2)
    );

    const isInPortal = distance < INTERACTION_DISTANCE;

    // 포털 범위를 벗어나면 재진입 가능하도록 리셋
    if (!isInPortal) {
      wasInPortalRef.current = false;
    }

    // 포털에 처음 진입할 때만 overview 열기
    if (!activeSection && isInPortal && !wasInPortalRef.current) {
      wasInPortalRef.current = true;
      setActiveSection("overview");
    }
  });

  const particleCount = 50;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 1.2 + Math.random() * 0.5;
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  return (
    <group position={PORTAL_POSITION}>
      <mesh ref={glowRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
      </mesh>

      <mesh ref={ringRef} position={[0, 1.5, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#8b5cf6"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={innerRingRef} position={[0, 1.5, 0]}>
        <torusGeometry args={[1.1, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#a78bfa"
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 1.5, 0]}>
        <circleGeometry args={[1.4, 64]} />
        <meshBasicMaterial
          color="#4c1d95"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      <points ref={particlesRef} position={[0, 1.5, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#e9d5ff"
          size={0.08}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.8, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      <pointLight position={[0, 1.5, 0]} color="#a78bfa" intensity={3} distance={8} />

      <Text
        position={[0, 4.2, 0]}
        fontSize={0.5}
        color="#e9d5ff"
        anchorX="center"
        anchorY="middle"
      >
        ALL
      </Text>
    </group>
  );
}
