import { useRef } from "react";
import { useFrame, useThree, RootState } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { HOUSE_POSITIONS } from "../constants";

interface IOrbitControls {
  target: THREE.Vector3;
  update: () => void;
  enabled: boolean;
}

export function useCameraControl(avatarPosition: THREE.Vector3) {
  const { camera } = useThree();
  const fallStartY = useRef<number | null>(null);

  useFrame((state: RootState) => {
    const controls = (state.controls as unknown) as IOrbitControls | undefined;
    const { activeSection, isFalling } = useGameStore.getState();

    if (isFalling) {
      if (controls) controls.enabled = false;

      if (fallStartY.current === null) {
        fallStartY.current = avatarPosition.y;
      }

      const fallDistance = fallStartY.current - avatarPosition.y;
      const flipProgress = Math.min(fallDistance / 50, 1);
      const flipAngle = flipProgress * Math.PI;

      const targetCamPos = new THREE.Vector3(
        avatarPosition.x,
        avatarPosition.y - Math.cos(flipAngle) * 4,
        avatarPosition.z + 6
      );
      camera.position.lerp(targetCamPos, 0.12);

      const lookY = 10 - Math.sin(flipAngle) * 100;
      camera.lookAt(0, lookY, 0);
      return;
    } else {
      fallStartY.current = null;
    }

    if (controls && !controls.enabled) {
      controls.enabled = true;
    }

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
