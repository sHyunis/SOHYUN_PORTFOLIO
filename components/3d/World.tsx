import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useCursor } from "@react-three/drei";
import { useGameStore } from "@/lib/store";
import * as THREE from "three";

import { HOUSE_POSITIONS } from "@/lib/constants";

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
      {/* House Body */}
      <mesh
        position={[0, 1.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(section);
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial 
          color={hovered ? "#38bdf8" : "#1e293b"} 
          roughness={0.1} 
          metalness={0.8}
          emissive={hovered ? "#0ea5e9" : "#000000"}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 3.75, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.5, 1.5, 4]} />
        <meshStandardMaterial 
          color={hovered ? "#38bdf8" : "#0f172a"} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>

      {/* Door / Portal */}
      <group position={[0, 1, 1.51]}>
        <mesh ref={doorRef} position={[0.5, 0, 0]}> {/* Pivot point adjustment */}
           <boxGeometry args={[1, 2, 0.1]} />
           <meshStandardMaterial 
             color="#000" 
             emissive="#38bdf8" 
             emissiveIntensity={hovered || isActive ? 2 : 0.5} 
             toneMapped={false}
           />
        </mesh>
      </group>

      {/* Label */}
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.5}
        color="#e0f2fe"
        anchorX="center"
        anchorY="middle"
        anchorX="center"
        anchorY="middle"
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
      {/* Ground */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setTargetPosition([e.point.x, 0, e.point.z]);
        }}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#333" roughness={0.8} metalness={0.2} />
      </mesh>
      <gridHelper args={[100, 100, "#444", "#222"]} position={[0, 0.01, 0]} />

      {/* Houses */}
      <House position={HOUSE_POSITIONS.about} color="#1d1d1f" label="About" section="about" />
      <House position={HOUSE_POSITIONS.work} color="#1d1d1f" label="Work" section="work" />
      <House position={HOUSE_POSITIONS.projects} color="#1d1d1f" label="Projects" section="projects" />
      <House position={HOUSE_POSITIONS.skills} color="#1d1d1f" label="Skills" section="skills" />
      <House position={HOUSE_POSITIONS.contact} color="#1d1d1f" label="Contact" section="contact" />
    </group>
  );
}
