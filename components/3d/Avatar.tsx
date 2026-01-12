"use client";

import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/store/gameStore";
import * as THREE from "three";
import { COLORS } from "@/constants/colors";

import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useAvatarMovement } from "./hooks/useAvatarMovement";
import { useAvatarAnimation } from "./hooks/useAvatarAnimation";
import { useCameraControl } from "./hooks/useCameraControl";
import { useNearbySection } from "./hooks/useNearbySection";
import { AvatarModel } from "./AvatarModel";

function RespawnEffect({ isActive }: { isActive: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!isActive) return;
    const time = state.clock.elapsedTime;

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 3;
      ringRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.2);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 4;
      ring2Ref.current.scale.setScalar(1.2 + Math.cos(time * 8) * 0.15);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(time * 6) * 0.3);
    }
  });

  if (!isActive) return null;

  return (
    <group position={[0, 0.5, 0]}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={COLORS.primary.cyan}
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 8, 32]} />
        <meshBasicMaterial
          color={COLORS.portal.purple}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[1.4, 0.03, 8, 32]} />
        <meshBasicMaterial
          color={COLORS.primary.cyan}
          transparent
          opacity={0.6}
        />
      </mesh>

      <pointLight color={COLORS.portal.purple} intensity={5} distance={5} />
    </group>
  );
}

export function Avatar() {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  const activeSection = useGameStore((state) => state.activeSection);
  const setTargetPosition = useGameStore((state) => state.setTargetPosition);

  const isControlActive = !activeSection;
  const handleKeyPress = useCallback(() => setTargetPosition(null), [setTargetPosition]);
  const movementRef = useKeyboardControls(isControlActive, handleKeyPress);

  const { position, direction, isRespawning } = useAvatarMovement(groupRef, movementRef);

  useAvatarAnimation(groupRef, leftArmRef, rightArmRef, leftLegRef, rightLegRef, direction);

  useCameraControl(position.current);
  useNearbySection(position.current);

  return (
    <group>
      <AvatarModel
        ref={groupRef}
        leftArmRef={leftArmRef}
        rightArmRef={rightArmRef}
        leftLegRef={leftLegRef}
        rightLegRef={rightLegRef}
      />
      <group position={[0, 0, 6]}>
        <RespawnEffect isActive={isRespawning} />
      </group>
    </group>
  );
}
