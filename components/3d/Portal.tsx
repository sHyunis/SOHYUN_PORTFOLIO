"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { avatarPosition } from "@/store/avatarPosition";
import { COLORS } from "@/constants/colors";

const PORTAL_POSITION: [number, number, number] = [0, 0, 0];
const INTERACTION_DISTANCE = 2.5;

export function Portal() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const hexagonRef = useRef<THREE.LineSegments>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const verticalRingsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wasInPortalRef = useRef(false);

  const setActiveSection = useGameStore((state) => state.setActiveSection);
  const activeSection = useGameStore((state) => state.activeSection);

  const hexagonEdges = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const radius = 1.6;
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    const geometry = new THREE.ShapeGeometry(shape);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.3;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z = -time * 0.5;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.7;
    }
    if (hexagonRef.current) {
      hexagonRef.current.rotation.z = -time * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.4;
      particlesRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
    if (verticalRingsRef.current) {
      verticalRingsRef.current.rotation.y = time * 0.6;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.3 + Math.sin(time * 3) * 0.05);
    }

    const distance = Math.sqrt(
      Math.pow(avatarPosition.x - PORTAL_POSITION[0], 2) +
      Math.pow(avatarPosition.z - PORTAL_POSITION[2], 2)
    );

    const isInPortal = distance < INTERACTION_DISTANCE;

    if (!isInPortal) {
      wasInPortalRef.current = false;
    }

    if (!activeSection && isInPortal && !wasInPortalRef.current) {
      wasInPortalRef.current = true;
      setActiveSection("overview");
    }
  });

  const particleCount = 80;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 1.3 + Math.random() * 0.4;
      positions[i * 3] = Math.cos(theta) * Math.sin(phi) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * radius;
      positions[i * 3 + 2] = Math.cos(phi) * radius;
    }
    return positions;
  }, []);

  return (
    <group position={PORTAL_POSITION}>
      <mesh ref={coreRef} position={[0, 1.5, 0]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#000000"
          emissive={COLORS.portal.purple}
          emissiveIntensity={3}
          metalness={1}
          roughness={0}
        />
      </mesh>

      <mesh position={[0, 1.5, 0]}>
        <circleGeometry args={[1.2, 64]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      <lineSegments ref={hexagonRef} position={[0, 1.5, 0]}>
        <bufferGeometry attach="geometry" {...hexagonEdges} />
        <lineBasicMaterial color={COLORS.portal.purpleLight} transparent opacity={0.8} />
      </lineSegments>

      <mesh ref={outerRingRef} position={[0, 1.5, 0]}>
        <torusGeometry args={[1.8, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={COLORS.primary.skyBlue}
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={middleRingRef} position={[0, 1.5, 0]}>
        <torusGeometry args={[1.5, 0.03, 8, 32]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={COLORS.portal.purple}
          emissiveIntensity={2.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={innerRingRef} position={[0, 1.5, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 48]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={COLORS.primary.skyBlue}
          emissiveIntensity={2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <group ref={verticalRingsRef} position={[0, 1.5, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={COLORS.primary.cyan}
            emissiveIntensity={1.5}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, Math.PI / 3, 0]}>
          <torusGeometry args={[1.55, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={COLORS.portal.purple}
            emissiveIntensity={1.5}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
          <torusGeometry args={[1.65, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={COLORS.primary.cyan}
            emissiveIntensity={1.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>

      <points ref={particlesRef} position={[0, 1.5, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={COLORS.primary.cyan}
          size={0.04}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.2, 6]} />
        <meshBasicMaterial
          color={COLORS.primary.cyan}
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 2.1, 6]} />
        <meshBasicMaterial
          color={COLORS.primary.skyBlue}
          transparent
          opacity={0.4}
        />
      </mesh>

      <pointLight position={[0, 1.5, 0]} color={COLORS.portal.purple} intensity={3} distance={8} />
      <pointLight position={[0, 2.5, 0]} color={COLORS.primary.cyan} intensity={2} distance={6} />
      <pointLight position={[0, 0.5, 0]} color={COLORS.primary.skyBlue} intensity={2} distance={5} />

      <Text
        position={[0, 4.2, 0]}
        fontSize={0.45}
        color={COLORS.portal.purpleLight}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        ALL
      </Text>
    </group>
  );
}
