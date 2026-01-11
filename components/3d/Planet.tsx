import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  ringColor?: string;
  hasRing?: boolean;
}

export function Planet({ position, size, color, ringColor = "#ffffff", hasRing = false }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.2 + Math.PI / 2;
      ringRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.1}
          distort={0.3}
          speed={2}
        />
      </mesh>
      
      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[size * 1.8, size * 0.2, 16, 100]} />
          <meshStandardMaterial 
            color={ringColor} 
            transparent 
            opacity={0.6} 
            roughness={0.5}
            emissive={ringColor}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
      
      {/* Glow effect */}
      <pointLight color={color} intensity={2} distance={size * 5} decay={2} />
    </Float>
  );
}
