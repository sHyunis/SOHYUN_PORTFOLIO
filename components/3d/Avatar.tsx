"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGameStore } from "@/lib/store";
import { HOUSE_POSITIONS } from "@/lib/constants";
import * as THREE from "three";

export function Avatar() {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Movement state
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });
  const position = useRef(new THREE.Vector3(0, 0, 0));
  const direction = useRef(new THREE.Vector3());

  // Refs for animation
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  const { targetPosition, setTargetPosition, activeSection } = useGameStore();
  const zoom = useRef(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSection) return; // Disable movement when inside a house

      // Cancel target position on manual input
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

  // Push back when exiting a section to prevent immediate re-entry
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
    if (activeSection) {
      // Zoom into the house
      const housePos = HOUSE_POSITIONS[activeSection as keyof typeof HOUSE_POSITIONS];
      if (housePos) {
        const targetCamPos = new THREE.Vector3(housePos[0], 2, housePos[2] + 2); // Inside/Door position
        const targetLookAt = new THREE.Vector3(housePos[0], 2, housePos[2]);
        
        camera.position.lerp(targetCamPos, 0.05);
        
        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt).add(camera.position);
        currentLookAt.lerp(targetLookAt, 0.05);
        camera.lookAt(currentLookAt);
      }
      return; // Stop movement logic
    }

    // Movement Logic
    const speed = 5;
    direction.current.set(0, 0, 0);

    // Manual Movement
    if (movement.forward) direction.current.z -= 1;
    if (movement.backward) direction.current.z += 1;
    if (movement.left) direction.current.x -= 1;
    if (movement.right) direction.current.x += 1;

    // Click-to-Move Logic
    if (targetPosition && direction.current.length() === 0) {
      const targetVec = new THREE.Vector3(targetPosition[0], 0, targetPosition[2]);
      const currentPos = group.current.position.clone();
      currentPos.y = 0; // Ignore height difference
      
      const distance = currentPos.distanceTo(targetVec);
      
      if (distance > 0.1) {
        const moveDir = targetVec.sub(currentPos).normalize();
        direction.current.copy(moveDir);
      } else {
        setTargetPosition(null); // Reached target
      }
    }

    if (direction.current.length() > 0) {
      direction.current.normalize().multiplyScalar(speed * delta);
      position.current.add(direction.current);
    }

    // Update Avatar Position
    group.current.position.copy(position.current);

    // Proximity Check
    let nearest = null;
    const threshold = 4; // Distance to trigger door opening
    
    for (const [key, pos] of Object.entries(HOUSE_POSITIONS)) {
      const housePos = new THREE.Vector3(pos[0], 0, pos[2]);
      const dist = position.current.distanceTo(housePos);
      
      if (dist < threshold) {
        nearest = key;
        // Auto-enter if very close
        if (dist < 2 && !useGameStore.getState().activeSection) {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             useGameStore.getState().setActiveSection(key as any);
        }
        break;
      }
    }
    
    // Only update store if changed to avoid re-renders
    if (useGameStore.getState().nearbySection !== nearest) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useGameStore.getState().setNearbySection(nearest as any);
    }

    // Camera Follow (Normal)
    const cameraOffset = new THREE.Vector3(0, 5, 10).multiplyScalar(zoom.current);
    const targetCameraPos = position.current.clone().add(cameraOffset);
    camera.position.lerp(targetCameraPos, 0.1);
    camera.lookAt(position.current);

    // Animation Logic
    const isMoving = direction.current.length() > 0;
    const animSpeed = 10;
    const time = state.clock.getElapsedTime();

    // Rotate character to face movement direction
    if (isMoving) {
      const angle = Math.atan2(direction.current.x, direction.current.z);
      const targetRotation = new THREE.Quaternion();
      targetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      group.current.quaternion.slerp(targetRotation, 0.2);
    }

    // Bobbing
    group.current.position.y = Math.sin(time * (isMoving ? animSpeed : 2)) * 0.05;

    // Limbs
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
      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.35]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0, 1.4, 0.15]}>
        <boxGeometry args={[0.3, 0.08, 0.1]} />
        <meshStandardMaterial color="#2997ff" emissive="#2997ff" emissiveIntensity={2} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#1d1d1f" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Chest Light */}
      <mesh position={[0, 0.9, 0.16]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#2997ff" emissive="#2997ff" emissiveIntensity={1} />
      </mesh>

      {/* Arms */}
      <group position={[-0.35, 1.1, 0]}>
        <mesh ref={leftArmRef} position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
      <group position={[0.35, 1.1, 0]}>
        <mesh ref={rightArmRef} position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[-0.15, 0.4, 0]}>
        <mesh ref={leftLegRef} position={[0, -0.35, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
      <group position={[0.15, 0.4, 0]}>
        <mesh ref={rightLegRef} position={[0, -0.35, 0]}>
          <boxGeometry args={[0.18, 0.8, 0.18]} />
          <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
