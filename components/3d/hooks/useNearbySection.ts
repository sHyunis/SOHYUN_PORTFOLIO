import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { HOUSE_POSITIONS } from "../constants";

const NEARBY_THRESHOLD = 6;
const AUTO_OPEN_DISTANCE = 2.5;

type TSectionKey = keyof typeof HOUSE_POSITIONS;

export function useNearbySection(avatarPosition: THREE.Vector3) {
  useFrame(() => {
    const state = useGameStore.getState();
    const { nearbySection, activeSection, targetPosition } = state;

    let nearest: TSectionKey | null = null;

    for (const [key, pos] of Object.entries(HOUSE_POSITIONS)) {
      const housePos = new THREE.Vector3(pos[0], 0, pos[2]);
      const dist = avatarPosition.distanceTo(housePos);

      if (dist < NEARBY_THRESHOLD) {
        nearest = key as TSectionKey;
        if (dist < AUTO_OPEN_DISTANCE && !activeSection && !targetPosition) {
          state.setActiveSection(key as TSectionKey);
        }
        break;
      }
    }

    if (nearbySection !== nearest) {
      state.setNearbySection(nearest);
    }
  });
}
