"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGameStore } from "@/store/gameStore";
import * as THREE from "three";

import { HOUSE_POSITIONS } from "./constants";
import { COLORS } from "@/constants/colors";

export function Avatar() {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });
  const position = useRef(new THREE.Vector3(0, 0, 0));
  const direction = useRef(new THREE.Vector3());

  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  const { targetPosition, setTargetPosition, activeSection, joystickInput } = useGameStore();
  const zoom = useRef(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSection) return;

      if (["KeyW", "KeyS", "KeyA", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        setTargetPosition(null);
      }

      switch (e.code) {
        case "KeyW": case "ArrowUp": setMovement(m => ({ ...m, forward: true })); break;
        case "KeyS": case "ArrowDown": setMovement(m => ({ ...m, backward: true })); break;
        case "KeyA": case "ArrowLeft": setMovement(m => ({ ...m, left: true })); break;
        case "KeyD": case "ArrowRight": setMovement(m => ({ ...m, right: true })); break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": case "ArrowUp": setMovement(m => ({ ...m, forward: false })); break;
        case "KeyS": case "ArrowDown": setMovement(m => ({ ...m, backward: false })); break;
        case "KeyA": case "ArrowLeft": setMovement(m => ({ ...m, left: false })); break;
        case "KeyD": case "ArrowRight": setMovement(m => ({ ...m, right: false })); break;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (activeSection) return;
      zoom.current = Math.max(0.5, Math.min(2, zoom.current + e.deltaY * 0.001));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [setTargetPosition, activeSection]);

  useEffect(() => {
    if (!activeSection && group.current) {
      for (const [, pos] of Object.entries(HOUSE_POSITIONS)) {
        const housePos = new THREE.Vector3(pos[0], 0, pos[2]);
        if (position.current.distanceTo(housePos) < 2.5) {
          const direction = position.current.clone().sub(housePos).normalize();
          if (direction.length() === 0) direction.set(0, 0, 1);
          
          const newPos = housePos.add(direction.multiplyScalar(3));
          position.current.copy(newPos);
          group.current.position.copy(newPos);
        }
      }
    }
  }, [activeSection]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Camera Logic
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controls = (state.controls as any);

    if (activeSection) {
      const housePos = HOUSE_POSITIONS[activeSection as keyof typeof HOUSE_POSITIONS];
      if (housePos) {
        const targetCamPos = new THREE.Vector3(housePos[0], 2, housePos[2] + 4);
        const targetLookAt = new THREE.Vector3(housePos[0], 2, housePos[2]);
        
        camera.position.lerp(targetCamPos, 0.05);
        if (controls) controls.target.lerp(targetLookAt, 0.05);
      }
      return;
    }

    const speed = 5;
    direction.current.set(0, 0, 0);

    // Keyboard input
    if (movement.forward) direction.current.z -= 1;
    if (movement.backward) direction.current.z += 1;
    if (movement.left) direction.current.x -= 1;
    if (movement.right) direction.current.x += 1;

    // Joystick input
    if (joystickInput && (joystickInput.x !== 0 || joystickInput.y !== 0)) {
      direction.current.x += joystickInput.x;
      direction.current.z += joystickInput.y;
    }

    if (targetPosition && direction.current.length() === 0) {
      const targetVec = new THREE.Vector3(targetPosition[0], 0, targetPosition[2]);
      const currentPos = group.current.position.clone();
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
      direction.current.normalize().multiplyScalar(speed * delta);
      position.current.add(direction.current);
    }

    group.current.position.copy(position.current);

    // Update avatar position in store
    useGameStore.getState().setAvatarPosition([
      position.current.x,
      position.current.y,
      position.current.z
    ]);

    let nearest = null;
    const threshold = 6;
    
    for (const [key, pos] of Object.entries(HOUSE_POSITIONS)) {
      const housePos = new THREE.Vector3(pos[0], 0, pos[2]);
      const dist = position.current.distanceTo(housePos);
      
      if (dist < threshold) {
        nearest = key;
        if (dist < 3 && !useGameStore.getState().activeSection && !targetPosition) {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             useGameStore.getState().setActiveSection(key as any);
        }
        break;
      }
    }
    
    if (useGameStore.getState().nearbySection !== nearest) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useGameStore.getState().setNearbySection(nearest as any);
    }


    if (controls) {
        // Offset the target slightly above the avatar to push the avatar down in the view
        const targetOffset = new THREE.Vector3(position.current.x, position.current.y + 1.5, position.current.z);
        controls.target.lerp(targetOffset, 0.1);
        controls.update();
    }

    const isMoving = direction.current.length() > 0;
    const animSpeed = 10;
    const time = state.clock.getElapsedTime();

    if (isMoving) {
      const targetRotationY = Math.atan2(direction.current.x, direction.current.z);
      
      let diff = targetRotationY - group.current.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      
      group.current.rotation.y += diff * 0.2;
    }


    group.current.position.y = Math.sin(time * (isMoving ? animSpeed : 2)) * 0.05;
    

    group.current.rotation.x = 0;
    group.current.rotation.z = 0;

    if (leftArmRef.current && rightArmRef.current && leftLegRef.current && rightLegRef.current) {
      const swing = isMoving ? Math.sin(time * animSpeed) * 0.5 : Math.sin(time * 2) * 0.05;
      
      leftArmRef.current.rotation.x = swing;
      rightArmRef.current.rotation.x = -swing;
      leftLegRef.current.rotation.x = -swing;
      rightLegRef.current.rotation.x = swing;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={0.5}>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.35]} />
        <meshStandardMaterial color={COLORS.avatar.head} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.4, 0.15]}>
        <boxGeometry args={[0.3, 0.08, 0.1]} />
        <meshStandardMaterial color={COLORS.avatar.accent} emissive={COLORS.avatar.accent} emissiveIntensity={2} />
      </mesh>

      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color={COLORS.avatar.body} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0.16]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color={COLORS.avatar.accent} emissive={COLORS.avatar.accent} emissiveIntensity={1} />
      </mesh>

      <group position={[-0.35, 1.1, 0]}>
        <mesh ref={leftArmRef} position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color={COLORS.avatar.head} roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      <group position={[0.35, 1.1, 0]}>
        <mesh ref={rightArmRef} position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color={COLORS.avatar.head} roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      <group position={[-0.15, 0.4, 0]}>
        <mesh ref={leftLegRef} position={[0, -0.35, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color={COLORS.avatar.limbs} roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
      <group position={[0.15, 0.4, 0]}>
        <mesh ref={rightLegRef} position={[0, -0.35, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color={COLORS.avatar.limbs} roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
