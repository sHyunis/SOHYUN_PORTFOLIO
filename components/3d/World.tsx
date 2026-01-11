import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useCursor, Sparkles } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";
import * as THREE from "three";

import { HOUSE_POSITIONS } from "./constants";
import { COLORS } from "@/constants/colors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function House({ position, color, label, section }: { position: [number, number, number], color: string, label: string, section: any }) {
  const { setActiveSection, activeSection, nearbySection } = useGameStore();
  const [hovered, setHover] = useState(false);
  useCursor(hovered);
  
  const doorRef = useRef<THREE.Mesh>(null);
  const isActive = activeSection === section || nearbySection === section;

  useFrame((state, delta) => {
    if (doorRef.current) {
      const targetRotation = isActive ? Math.PI / 2 : 0;
      doorRef.current.rotation.y = THREE.MathUtils.lerp(doorRef.current.rotation.y, targetRotation, delta * 5);
    }
  });

  return (
    <group position={position}>
      <mesh
        position={[0, 1.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          const targetZ = position[2] + 1.5;
          useGameStore.getState().setTargetPosition([position[0], 0, targetZ]);
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color={hovered ? COLORS.primary.skyBlue : COLORS.background.slate}
          roughness={0.1}
          metalness={0.8}
          emissive={hovered ? COLORS.primary.skyBlueEmissive : COLORS.neutral.black}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <mesh position={[0, 3.75, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.5, 1.5, 4]} />
        <meshStandardMaterial
          color={hovered ? COLORS.primary.skyBlue : COLORS.background.slateDark}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      <group position={[0, 1, 1.51]}>
        <mesh ref={doorRef} position={[0.5, 0, 0]}>
           <boxGeometry args={[1, 2, 0.1]} />
           <meshStandardMaterial
             color={COLORS.neutral.black}
             emissive={COLORS.primary.skyBlue}
             emissiveIntensity={hovered || isActive ? 2 : 0.5}
             toneMapped={false}
           />
        </mesh>
      </group>

      <Text
        position={[0, 5.5, 0]}
        fontSize={0.6}
        color={COLORS.primary.cyan}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        outlineWidth={0.02}
        outlineColor={COLORS.neutral.black}
      >
        {label}
      </Text>
    </group>
  );
}

export function World() {
  const { setTargetPosition } = useGameStore();

  return (
    <group>
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setTargetPosition([e.point.x, 0, e.point.z]);
        }}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={COLORS.neutral.mediumGray} roughness={0.8} metalness={0.2} />
      </mesh>
      <gridHelper args={[100, 100, COLORS.neutral.gray, COLORS.neutral.darkGray]} position={[0, 0.01, 0]} />

      <House position={HOUSE_POSITIONS.about as [number, number, number]} color={COLORS.background.veryDark} label="About" section="about" />
      <House position={HOUSE_POSITIONS.work as [number, number, number]} color={COLORS.background.veryDark} label="Work" section="work" />
      <House position={HOUSE_POSITIONS.projects as [number, number, number]} color={COLORS.background.veryDark} label="Projects" section="projects" />
      <House position={HOUSE_POSITIONS.skills as [number, number, number]} color={COLORS.background.veryDark} label="Skills" section="skills" />
      <House position={HOUSE_POSITIONS.contact as [number, number, number]} color={COLORS.background.veryDark} label="Contact" section="contact" />
      <House position={HOUSE_POSITIONS.guestbook as [number, number, number]} color={COLORS.background.veryDark} label="방명록" section="guestbook" />
    </group>
  );
}
