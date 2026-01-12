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
  const wasOnRocket = useRef(false);
  const postRocketTransition = useRef(0);

  useFrame((state: RootState, delta: number) => {
    const controls = (state.controls as unknown) as IOrbitControls | undefined;
    const { activeSection, isFalling, rocketRescue } = useGameStore.getState();

    if (rocketRescue) {
      if (controls) controls.enabled = false;
      wasOnRocket.current = true;

      const targetCamPos = new THREE.Vector3(
        avatarPosition.x + 8,
        avatarPosition.y + 3,
        avatarPosition.z + 8
      );
      camera.position.lerp(targetCamPos, 0.08);
      camera.lookAt(avatarPosition.x, avatarPosition.y, avatarPosition.z);
      return;
    }

    if (wasOnRocket.current && !rocketRescue) {
      if (controls) controls.enabled = false;
      postRocketTransition.current += delta;

      const targetCamPos = new THREE.Vector3(0, 1.8, 12);
      const targetLookAt = new THREE.Vector3(0, 1, 6);

      camera.position.lerp(targetCamPos, 0.06);
      camera.lookAt(
        camera.position.x * 0.9 + targetLookAt.x * 0.1,
        camera.position.y * 0.9 + targetLookAt.y * 0.1,
        camera.position.z * 0.9 + targetLookAt.z * 0.1
      );

      if (postRocketTransition.current > 1) {
        wasOnRocket.current = false;
        postRocketTransition.current = 0;
        if (controls) {
          controls.target.set(0, 1, 6);
          controls.enabled = true;
        }
      }
      return;
    }

    if (isFalling && !rocketRescue) {
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
