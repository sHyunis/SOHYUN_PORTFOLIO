"use client";

import { useRef, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import * as THREE from "three";

import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useAvatarMovement } from "./hooks/useAvatarMovement";
import { useAvatarAnimation } from "./hooks/useAvatarAnimation";
import { useCameraControl } from "./hooks/useCameraControl";
import { useNearbySection } from "./hooks/useNearbySection";
import { AvatarModel } from "./AvatarModel";

export function Avatar() {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  // Use selectors to only subscribe to specific state
  const activeSection = useGameStore((state) => state.activeSection);
  const setTargetPosition = useGameStore((state) => state.setTargetPosition);

  const isControlActive = !activeSection;
  const handleKeyPress = useCallback(() => setTargetPosition(null), [setTargetPosition]);
  const movementRef = useKeyboardControls(isControlActive, handleKeyPress);

  const { position, direction } = useAvatarMovement(groupRef, movementRef);

  useAvatarAnimation(groupRef, leftArmRef, rightArmRef, leftLegRef, rightLegRef, direction);

  useCameraControl(position.current);
  useNearbySection(position.current);

  return (
    <AvatarModel
      ref={groupRef}
      leftArmRef={leftArmRef}
      rightArmRef={rightArmRef}
      leftLegRef={leftLegRef}
      rightLegRef={rightLegRef}
    />
  );
}
