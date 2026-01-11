import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { HOUSE_POSITIONS } from "../constants";

const NEARBY_THRESHOLD = 6;
const AUTO_OPEN_DISTANCE = 2.5;

export function useNearbySection(avatarPosition: THREE.Vector3) {
  const { setNearbySection, setActiveSection, activeSection, targetPosition } = useGameStore();

  useFrame(() => {
    let nearest = null;

    for (const [key, pos] of Object.entries(HOUSE_POSITIONS)) {
      const housePos = new THREE.Vector3(pos[0], 0, pos[2]);
      const dist = avatarPosition.distanceTo(housePos);

      if (dist < NEARBY_THRESHOLD) {
        nearest = key;
        if (dist < AUTO_OPEN_DISTANCE && !activeSection && !targetPosition) {
          setActiveSection(key as any);
        }
        break;
      }
    }

    if (useGameStore.getState().nearbySection !== nearest) {
      setNearbySection(nearest as any);
    }
  });
}
