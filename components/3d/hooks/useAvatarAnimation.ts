import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ANIMATION_SPEED = 10;
const IDLE_ANIMATION_SPEED = 2;

export function useAvatarAnimation(
  groupRef: React.RefObject<THREE.Group | null>,
  leftArmRef: React.RefObject<THREE.Mesh | null>,
  rightArmRef: React.RefObject<THREE.Mesh | null>,
  leftLegRef: React.RefObject<THREE.Mesh | null>,
  rightLegRef: React.RefObject<THREE.Mesh | null>,
  isMoving: boolean
) {
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const animSpeed = isMoving ? ANIMATION_SPEED : IDLE_ANIMATION_SPEED;

    groupRef.current.position.y = Math.sin(time * animSpeed) * 0.05;
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.z = 0;

    const leftArmMesh = leftArmRef.current;
    const rightArmMesh = rightArmRef.current;
    const leftLegMesh = leftLegRef.current;
    const rightLegMesh = rightLegRef.current;

    if (leftArmMesh && rightArmMesh && leftLegMesh && rightLegMesh) {
      const swing = isMoving ? Math.sin(time * animSpeed) * 0.5 : Math.sin(time * IDLE_ANIMATION_SPEED) * 0.05;

      leftArmMesh.rotation.x = swing;
      rightArmMesh.rotation.x = -swing;
      leftLegMesh.rotation.x = -swing;
      rightLegMesh.rotation.x = swing;
    }
  });
}
