import { ThreeEvent } from "@react-three/fiber";
import { useGameStore } from "@/store/gameStore";
import { HOUSE_POSITIONS } from "./constants";
import { COLORS } from "@/constants/colors";
import { House } from "./House";
import { Portal } from "./Portal";

const HOUSES = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
  { id: "guestbook", label: "방명록" },
] as const;

export function World() {
  const { setTargetPosition } = useGameStore();

  const handleGroundClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setTargetPosition([e.point.x, 0, e.point.z]);
  };

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} onClick={handleGroundClick}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={COLORS.neutral.mediumGray} roughness={0.8} metalness={0.2} />
      </mesh>

      <gridHelper args={[60, 60, COLORS.neutral.gray, COLORS.neutral.darkGray]} position={[0, 0.01, 0]} />

      {HOUSES.map((house) => (
        <House key={house.id} position={HOUSE_POSITIONS[house.id] as [number, number, number]} label={house.label} section={house.id} />
      ))}

      <Portal />
    </group>
  );
}
