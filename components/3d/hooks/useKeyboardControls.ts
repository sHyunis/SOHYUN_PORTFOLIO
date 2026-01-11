import { useEffect, useRef } from "react";

interface IMovementState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

const MOVEMENT_KEYS = {
  forward: ["KeyW", "ArrowUp"],
  backward: ["KeyS", "ArrowDown"],
  left: ["KeyA", "ArrowLeft"],
  right: ["KeyD", "ArrowRight"],
};

const INITIAL_MOVEMENT: IMovementState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export function useKeyboardControls(isActive: boolean, onKeyPress?: () => void) {
  const movementRef = useRef<IMovementState>({ ...INITIAL_MOVEMENT });
  const onKeyPressRef = useRef(onKeyPress);

  useEffect(() => {
    onKeyPressRef.current = onKeyPress;
  });

  // Reset movement when becoming inactive
  useEffect(() => {
    if (!isActive) {
      movementRef.current = { ...INITIAL_MOVEMENT };
    }
  }, [isActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

      const allKeys = Object.values(MOVEMENT_KEYS).flat();
      if (allKeys.includes(e.code)) {
        onKeyPressRef.current?.();
      }

      const m = movementRef.current;
      if (MOVEMENT_KEYS.forward.includes(e.code)) m.forward = true;
      if (MOVEMENT_KEYS.backward.includes(e.code)) m.backward = true;
      if (MOVEMENT_KEYS.left.includes(e.code)) m.left = true;
      if (MOVEMENT_KEYS.right.includes(e.code)) m.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const m = movementRef.current;
      if (MOVEMENT_KEYS.forward.includes(e.code)) m.forward = false;
      if (MOVEMENT_KEYS.backward.includes(e.code)) m.backward = false;
      if (MOVEMENT_KEYS.left.includes(e.code)) m.left = false;
      if (MOVEMENT_KEYS.right.includes(e.code)) m.right = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive]);

  return movementRef;
}
