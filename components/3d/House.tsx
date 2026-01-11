import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text, useCursor } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";
import * as THREE from "three";
import { COLORS } from "@/constants/colors";

interface IHouseProps {
  position: [number, number, number];
  label: string;
  section: string;
}

export function House({ position, label, section }: IHouseProps) {
  const doorRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [houseHovered, setHouseHovered] = useState(false);

  const activeSection = useGameStore((state) => state.activeSection);
  const nearbySection = useGameStore((state) => state.nearbySection);
  const setTargetPosition = useGameStore((state) => state.setTargetPosition);

  const isActive = activeSection === section || nearbySection === section;
  const isAnyHovered = hovered || houseHovered;

  useCursor(isAnyHovered);

  useFrame((_, delta) => {
    if (doorRef.current) {
      const targetRotation = isActive ? Math.PI / 2 : 0;
      doorRef.current.rotation.y = THREE.MathUtils.lerp(doorRef.current.rotation.y, targetRotation, delta * 5);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const targetZ = position[2] + 1.5;
    setTargetPosition([position[0], 0, targetZ]);
  };

  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} onClick={handleClick} onPointerOver={() => setHouseHovered(true)} onPointerOut={() => setHouseHovered(false)}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={COLORS.background.slate} roughness={0.1} metalness={0.8} transparent opacity={0.7} />
      </mesh>

      <mesh position={[0, 3.75, 0]} rotation={[0, Math.PI / 4, 0]} onClick={handleClick} onPointerOver={() => setHouseHovered(true)} onPointerOut={() => setHouseHovered(false)}>
        <coneGeometry args={[2.5, 1.5, 4]} />
        <meshStandardMaterial color={COLORS.background.slateDark} roughness={0.1} metalness={0.9} transparent opacity={0.7} />
      </mesh>

      <group position={[0, 1, 1.51]}>
        <mesh ref={doorRef} position={[0.5, 0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <boxGeometry args={[1, 2, 0.1]} />
          <meshStandardMaterial color={COLORS.neutral.black} emissive={COLORS.primary.skyBlue} emissiveIntensity={hovered || isActive ? 2 : 0.5} toneMapped={false} />
        </mesh>
      </group>

      <Text position={[0, 5.5, 0]} fontSize={0.45} color={COLORS.white.base} anchorX="center" anchorY="middle" letterSpacing={0.2} outlineWidth={0.03} outlineColor={COLORS.neutral.black} outlineOpacity={1} fillOpacity={1}>
        {label.toUpperCase()}
      </Text>
    </group>
  );
}
