import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { avatarPosition } from "@/store/avatarPosition";

interface IMovementInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

const MOVEMENT_SPEED = 5;

export function useAvatarMovement(
  groupRef: React.RefObject<THREE.Group | null>,
  movementRef: React.RefObject<IMovementInput | null>
) {
  const position = useRef(new THREE.Vector3(0, 0, 6));
  const direction = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!groupRef.current || !movementRef.current) return;

    const { targetPosition, setTargetPosition, joystickInput } = useGameStore.getState();
    const movement = movementRef.current;

    direction.current.set(0, 0, 0);

    if (movement.forward) direction.current.z -= 1;
    if (movement.backward) direction.current.z += 1;
    if (movement.left) direction.current.x -= 1;
    if (movement.right) direction.current.x += 1;

    if (joystickInput && (joystickInput.x !== 0 || joystickInput.y !== 0)) {
      // 카메라의 전방 방향 (XZ 평면에 투영)
      const cameraDirection = new THREE.Vector3();
      state.camera.getWorldDirection(cameraDirection);
      cameraDirection.y = 0;
      cameraDirection.normalize();

      // 카메라의 오른쪽 방향
      const cameraRight = new THREE.Vector3();
      cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

      // 조이스틱 입력을 카메라 기준으로 변환
      // joystickInput.y 음수 (위로 밀기) -> 카메라 전방으로 이동
      // joystickInput.x 양수 (오른쪽으로 밀기) -> 카메라 오른쪽으로 이동
      direction.current.x += cameraDirection.x * (-joystickInput.y) + cameraRight.x * joystickInput.x;
      direction.current.z += cameraDirection.z * (-joystickInput.y) + cameraRight.z * joystickInput.x;
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

    // Update global position object (no React re-renders)
    avatarPosition.x = position.current.x;
    avatarPosition.y = position.current.y;
    avatarPosition.z = position.current.z;

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
