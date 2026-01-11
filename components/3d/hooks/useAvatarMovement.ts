import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";

interface MovementInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

const MOVEMENT_SPEED = 5;

export function useAvatarMovement(
  groupRef: React.RefObject<THREE.Group | null>,
  movement: MovementInput
) {
  const position = useRef(new THREE.Vector3(0, 0, 0));
  const direction = useRef(new THREE.Vector3());

  const { targetPosition, setTargetPosition, joystickInput, setAvatarPosition } = useGameStore();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    direction.current.set(0, 0, 0);

    if (movement.forward) direction.current.z -= 1;
    if (movement.backward) direction.current.z += 1;
    if (movement.left) direction.current.x -= 1;
    if (movement.right) direction.current.x += 1;

    if (joystickInput && (joystickInput.x !== 0 || joystickInput.y !== 0)) {
      direction.current.x += joystickInput.x;
      direction.current.z += joystickInput.y;
    }

    if (targetPosition && direction.current.length() === 0) {
      const targetVec = new THREE.Vector3(targetPosition[0], 0, targetPosition[2]);
      const currentPos = groupRef.current.position.clone();
      currentPos.y = 0;

      const distance = currentPos.distanceTo(targetVec);

      if (distance > 0.1) {
        const moveDir = targetVec.sub(currentPos).normalize();
        direction.current.copy(moveDir);
      } else {
        setTargetPosition(null);
      }
    }

    if (direction.current.length() > 0) {
      direction.current.normalize().multiplyScalar(MOVEMENT_SPEED * delta);
      position.current.add(direction.current);
    }

    groupRef.current.position.copy(position.current);

    setAvatarPosition([position.current.x, position.current.y, position.current.z]);

    if (direction.current.length() > 0) {
      const targetRotationY = Math.atan2(direction.current.x, direction.current.z);

      let diff = targetRotationY - groupRef.current.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;

      groupRef.current.rotation.y += diff * 0.2;
    }
  });

  return { position, direction };
}
