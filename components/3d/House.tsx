import { useRef, useState, useMemo } from "react";
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
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const activeSection = useGameStore((state) => state.activeSection);
  const nearbySection = useGameStore((state) => state.nearbySection);
  const setTargetPosition = useGameStore((state) => state.setTargetPosition);

  const isActive = activeSection === section || nearbySection === section;
  const isHighlighted = hovered || isActive;

  useCursor(hovered);

  const boxEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(3, 3, 3)), []);
  const roofEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.ConeGeometry(2.5, 1.5, 4)), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetY = hovered ? 0.1 : 0;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setTargetPosition([position[0], 0, position[2] + 2]);
  };

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* 집 본체 */}
        <mesh
          position={[0, 1.5, 0]}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* 집 엣지 - 빛나는 라인 */}
        <lineSegments position={[0, 1.5, 0]} geometry={boxEdges}>
          <lineBasicMaterial
            color={COLORS.primary.skyBlue}
            transparent
            opacity={isHighlighted ? 1 : 0.3}
          />
        </lineSegments>

        {/* 지붕 */}
        <mesh
          position={[0, 3.75, 0]}
          rotation={[0, Math.PI / 4, 0]}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <coneGeometry args={[2.5, 1.5, 4]} />
          <meshStandardMaterial
            color="#141414"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* 지붕 엣지 */}
        <lineSegments position={[0, 3.75, 0]} rotation={[0, Math.PI / 4, 0]} geometry={roofEdges}>
          <lineBasicMaterial
            color={COLORS.primary.skyBlue}
            transparent
            opacity={isHighlighted ? 1 : 0.3}
          />
        </lineSegments>

        {/* 문 - 빛나는 패널 */}
        <mesh position={[0, 1, 1.52]}>
          <boxGeometry args={[0.9, 1.8, 0.05]} />
          <meshStandardMaterial
            color="#000000"
            emissive={COLORS.primary.skyBlue}
            emissiveIntensity={isHighlighted ? 1.5 : 0.4}
          />
        </mesh>

        {/* 라벨 */}
        <Text
          position={[0, 5.2, 0]}
          fontSize={0.4}
          color={isHighlighted ? COLORS.primary.skyBlue : COLORS.white.base}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          {label.toUpperCase()}
        </Text>
      </group>

      {/* 바닥 글로우 */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial
          color={COLORS.primary.skyBlue}
          transparent
          opacity={isHighlighted ? 0.2 : 0.05}
        />
      </mesh>

      {/* 조명 */}
      <pointLight
        position={[0, 2, 2]}
        color={COLORS.primary.skyBlue}
        intensity={isHighlighted ? 2 : 0.5}
        distance={5}
      />
    </group>
  );
}
