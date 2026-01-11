import { useState, useEffect } from "react";

interface MovementState {
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

export function useKeyboardControls(isActive: boolean, onKeyPress?: () => void) {
  const [movement, setMovement] = useState<MovementState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    if (!isActive) {
      setMovement({ forward: false, backward: false, left: false, right: false });
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const allKeys = Object.values(MOVEMENT_KEYS).flat();

      if (allKeys.includes(e.code)) {
        onKeyPress?.();
      }

      if (MOVEMENT_KEYS.forward.includes(e.code)) {
        setMovement((m) => ({ ...m, forward: true }));
      }
      if (MOVEMENT_KEYS.backward.includes(e.code)) {
        setMovement((m) => ({ ...m, backward: true }));
      }
      if (MOVEMENT_KEYS.left.includes(e.code)) {
        setMovement((m) => ({ ...m, left: true }));
      }
      if (MOVEMENT_KEYS.right.includes(e.code)) {
        setMovement((m) => ({ ...m, right: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (MOVEMENT_KEYS.forward.includes(e.code)) {
        setMovement((m) => ({ ...m, forward: false }));
      }
      if (MOVEMENT_KEYS.backward.includes(e.code)) {
        setMovement((m) => ({ ...m, backward: false }));
      }
      if (MOVEMENT_KEYS.left.includes(e.code)) {
        setMovement((m) => ({ ...m, left: false }));
      }
      if (MOVEMENT_KEYS.right.includes(e.code)) {
        setMovement((m) => ({ ...m, right: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive, onKeyPress]);

  return movement;
}
