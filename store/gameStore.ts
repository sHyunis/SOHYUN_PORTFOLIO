import { create } from "zustand";

type TActiveSection = "about" | "work" | "projects" | "skills" | "contact" | "guestbook" | "overview" | null;

interface GameState {
  activeSection: TActiveSection;
  setActiveSection: (section: TActiveSection) => void;
  targetPosition: [number, number, number] | null;
  setTargetPosition: (position: [number, number, number] | null) => void;
  nearbySection: TActiveSection;
  setNearbySection: (section: TActiveSection) => void;
  joystickInput: { x: number; y: number };
  setJoystickInput: (input: { x: number; y: number }) => void;
}

export const useGameStore = create<GameState>((set) => ({
  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),
  targetPosition: null,
  setTargetPosition: (position) => set({ targetPosition: position }),
  nearbySection: null,
  setNearbySection: (section) => set({ nearbySection: section }),
  joystickInput: { x: 0, y: 0 },
  setJoystickInput: (input) => set({ joystickInput: input }),
}));
