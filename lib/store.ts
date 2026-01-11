import { create } from "zustand";

type Section = "about" | "work" | "projects" | "skills" | "contact" | null;

interface GameState {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  targetPosition: [number, number, number] | null;
  setTargetPosition: (position: [number, number, number] | null) => void;
  nearbySection: Section;
  setNearbySection: (section: Section) => void;
}

export const useGameStore = create<GameState>((set) => ({
  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),
  targetPosition: null,
  setTargetPosition: (position) => set({ targetPosition: position }),
  nearbySection: null,
  setNearbySection: (section) => set({ nearbySection: section }),
}));
