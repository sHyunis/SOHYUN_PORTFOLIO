import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarParts {
  leftArm: React.RefObject<THREE.Mesh | null>;
  rightArm: React.RefObject<THREE.Mesh | null>;
  leftLeg: React.RefObject<THREE.Mesh | null>;
  rightLeg: React.RefObject<THREE.Mesh | null>;
}

const ANIMATION_SPEED = 10;
const IDLE_ANIMATION_SPEED = 2;

export function useAvatarAnimation(
  groupRef: React.RefObject<THREE.Group | null>,
  parts: AvatarParts,
  isMoving: boolean
) {
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const animSpeed = isMoving ? ANIMATION_SPEED : IDLE_ANIMATION_SPEED;

    groupRef.current.position.y = Math.sin(time * animSpeed) * 0.05;
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.z = 0;

    if (parts.leftArm.current && parts.rightArm.current && parts.leftLeg.current && parts.rightLeg.current) {
      const swing = isMoving ? Math.sin(time * animSpeed) * 0.5 : Math.sin(time * IDLE_ANIMATION_SPEED) * 0.05;

      parts.leftArm.current.rotation.x = swing;
      parts.rightArm.current.rotation.x = -swing;
      parts.leftLeg.current.rotation.x = -swing;
      parts.rightLeg.current.rotation.x = swing;
    }
  });
}
