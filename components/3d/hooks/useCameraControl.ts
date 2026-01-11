import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { HOUSE_POSITIONS } from "../constants";

export function useCameraControl(avatarPosition: THREE.Vector3) {
  const { camera } = useThree();
  const { activeSection } = useGameStore();

  useFrame((state) => {
    const controls = (state.controls as any);

    if (activeSection) {
      const housePos = HOUSE_POSITIONS[activeSection as keyof typeof HOUSE_POSITIONS];
      if (housePos) {
        const targetCamPos = new THREE.Vector3(housePos[0], 2, housePos[2] + 4);
        const targetLookAt = new THREE.Vector3(housePos[0], 2, housePos[2]);

        camera.position.lerp(targetCamPos, 0.05);
        if (controls) controls.target.lerp(targetLookAt, 0.05);
      }
      return;
    }

    if (controls) {
      const targetOffset = new THREE.Vector3(avatarPosition.x, avatarPosition.y + 1.5, avatarPosition.z);
      controls.target.lerp(targetOffset, 0.1);
      controls.update();
    }
  });
}
