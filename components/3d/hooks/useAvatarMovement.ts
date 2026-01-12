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
const ROCKET_CATCH_Y = -25;
const ROCKET_RISE_SPEED = 25;
const RESPAWN_Y = 0;

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
  const isOnRocket = useRef(false);
  const rocketPhase = useRef<"catching" | "rising" | "landing" | "departing" | null>(null);
  const departTime = useRef(0);

  const triggerRespawn = useCallback(() => {
    setIsRespawning(true);
    respawnTime.current = 0;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !movementRef.current) return;

    const { targetPosition, setTargetPosition, joystickInput, teleportTo, setTeleportTo } = useGameStore.getState();
    const movement = movementRef.current;

    if (teleportTo) {
      position.current.set(teleportTo[0], teleportTo[1], teleportTo[2]);
      groupRef.current.position.copy(position.current);
      avatarPosition.x = teleportTo[0];
      avatarPosition.y = teleportTo[1];
      avatarPosition.z = teleportTo[2];
      setTeleportTo(null);
      return;
    }

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

    if (isFalling.current && !isOnRocket.current) {
      fallVelocity.current += FALL_ACCELERATION * delta;
      position.current.y -= fallVelocity.current * delta;

      groupRef.current.rotation.x += fallRotation.current.x * delta;
      groupRef.current.rotation.z += fallRotation.current.z * delta;

      if (position.current.y < ROCKET_CATCH_Y) {
        isOnRocket.current = true;
        rocketPhase.current = "catching";
        fallVelocity.current = 0;
        groupRef.current.rotation.set(0, 0, 0);
        groupRef.current.visible = false;
        useGameStore.getState().setRocketRescue(true);
        useGameStore.getState().setRocketPosition([position.current.x, position.current.y - 1.5, position.current.z]);
      }

      groupRef.current.position.copy(position.current);
      avatarPosition.x = position.current.x;
      avatarPosition.y = position.current.y;
      avatarPosition.z = position.current.z;
      return;
    }

    if (isOnRocket.current) {
      const store = useGameStore.getState();
      const rocketOffset = 1.8;

      if (rocketPhase.current === "catching") {
        rocketPhase.current = "rising";
        groupRef.current.rotation.set(0, 0, 0);
      }

      if (rocketPhase.current === "rising") {
        const targetY = RESPAWN_Y + 10;
        const progress = Math.min((position.current.y + 25) / (targetY + 25), 1);
        const easeOut = 1 - Math.pow(1 - progress, 2);
        const currentSpeed = ROCKET_RISE_SPEED * (1.2 - easeOut * 0.7);

        position.current.y += currentSpeed * delta;
        position.current.x += (0 - position.current.x) * 0.02;
        position.current.z += (6 - position.current.z) * 0.02;

        store.setRocketPosition([position.current.x, position.current.y - rocketOffset, position.current.z]);

        if (position.current.y >= targetY) {
          rocketPhase.current = "landing";
        }
      }

      if (rocketPhase.current === "landing") {
        groupRef.current.visible = false;

        const targetY = 3;
        const heightAboveTarget = position.current.y - targetY;
        const landingSpeed = Math.max(1.5, heightAboveTarget * 0.8);
        position.current.y -= landingSpeed * delta;

        const hoverWobble = Math.sin(Date.now() * 0.005) * 0.03;
        store.setRocketPosition([hoverWobble, position.current.y - rocketOffset, 6]);

        if (position.current.y <= targetY + 0.3) {
          position.current.set(0, targetY, 6);
          rocketPhase.current = "departing";
          departTime.current = 0;
          groupRef.current.visible = true;
        }
      }

      if (rocketPhase.current === "departing") {
        departTime.current += delta;

        const hoverWobble = Math.sin(Date.now() * 0.003) * 0.02;
        const hoverY = Math.sin(Date.now() * 0.004) * 0.03;
        store.setRocketPosition([hoverWobble, 3 - rocketOffset + hoverY, 6]);

        const descendSpeed = 8;
        position.current.y -= descendSpeed * delta;

        if (position.current.y <= RESPAWN_Y) {
          position.current.set(0, 0, 10);
          groupRef.current.rotation.set(0, 0, 0);
          isOnRocket.current = false;
          rocketPhase.current = null;
          isFalling.current = false;
          store.setRocketRescue(false);
          store.setIsFalling(false);
          store.setJoystickInput({ x: 0, y: 0 });
          store.setTargetPosition(null);
        }
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

  return { position, direction, isRespawning };
}
