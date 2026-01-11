"use client";

import { useRef } from "react";
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

  const { activeSection, setTargetPosition } = useGameStore();

  const isControlActive = !activeSection;
  const movement = useKeyboardControls(isControlActive, () => setTargetPosition(null));

  const { position, direction } = useAvatarMovement(groupRef, movement);
  const isMoving = direction.current.length() > 0;

  useAvatarAnimation(groupRef, leftArmRef, rightArmRef, leftLegRef, rightLegRef, isMoving);

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
