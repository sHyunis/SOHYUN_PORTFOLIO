import { useRef, useState, useCallback } from "react";
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
const FLOOR_BOUNDARY = 18;
const FALL_SPEED = 12;
const FALL_ACCELERATION = 20;
const RESPAWN_Y = -120;

export function useAvatarMovement(
  groupRef: React.RefObject<THREE.Group | null>,
  movementRef: React.RefObject<IMovementInput | null>
) {
  const position = useRef(new THREE.Vector3(0, 0, 6));
  const direction = useRef(new THREE.Vector3());
  const isFalling = useRef(false);
  const fallVelocity = useRef(0);
  const fallRotation = useRef({ x: 0, z: 0 });
  const [isRespawning, setIsRespawning] = useState(false);
  const respawnTime = useRef(0);

  const triggerRespawn = useCallback(() => {
    setIsRespawning(true);
    respawnTime.current = 0;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !movementRef.current) return;

    const { targetPosition, setTargetPosition, joystickInput } = useGameStore.getState();
    const movement = movementRef.current;

    if (isRespawning) {
      respawnTime.current += delta;
      const progress = Math.min(respawnTime.current / 0.5, 1);
      const scale = 1 + Math.sin(progress * Math.PI) * 0.3;
      groupRef.current.scale.setScalar(scale);

      if (progress >= 1) {
        setIsRespawning(false);
        groupRef.current.scale.setScalar(1);
      }
      return;
    }

    const isOutsideFloor =
      Math.abs(position.current.x) > FLOOR_BOUNDARY ||
      Math.abs(position.current.z) > FLOOR_BOUNDARY;

    if (isOutsideFloor && !isFalling.current) {
      isFalling.current = true;
      fallVelocity.current = FALL_SPEED;
      fallRotation.current = {
        x: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 4,
      };
      setTargetPosition(null);
      useGameStore.getState().setIsFalling(true);
    }

    if (isFalling.current) {
      fallVelocity.current += FALL_ACCELERATION * delta;
      position.current.y -= fallVelocity.current * delta;

      groupRef.current.rotation.x += fallRotation.current.x * delta;
      groupRef.current.rotation.z += fallRotation.current.z * delta;

      if (position.current.y < RESPAWN_Y) {
        position.current.set(0, 0, 6);
        groupRef.current.rotation.set(0, 0, 0);
        isFalling.current = false;
        fallVelocity.current = 0;
        useGameStore.getState().setIsFalling(false);
        useGameStore.getState().triggerIntroReplay();
        triggerRespawn();
      }

      groupRef.current.position.copy(position.current);
      avatarPosition.x = position.current.x;
      avatarPosition.y = position.current.y;
      avatarPosition.z = position.current.z;
      return;
    }

    direction.current.set(0, 0, 0);

    if (movement.forward) direction.current.z -= 1;
    if (movement.backward) direction.current.z += 1;
    if (movement.left) direction.current.x -= 1;
    if (movement.right) direction.current.x += 1;

    if (joystickInput && (joystickInput.x !== 0 || joystickInput.y !== 0)) {
      const cameraDirection = new THREE.Vector3();
      state.camera.getWorldDirection(cameraDirection);
      cameraDirection.y = 0;
      cameraDirection.normalize();

      const cameraRight = new THREE.Vector3();
      cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

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

  return { position, direction, isRespawning, isFalling: isFalling.current };
}
