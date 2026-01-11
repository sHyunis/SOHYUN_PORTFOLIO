import { create } from "zustand";

type ActiveSection = "about" | "work" | "projects" | "skills" | "contact" | "guestbook" | null;

interface GameState {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  targetPosition: [number, number, number] | null;
  setTargetPosition: (position: [number, number, number] | null) => void;
  nearbySection: ActiveSection;
  setNearbySection: (section: ActiveSection) => void;
}

export const useGameStore = create<GameState>((set) => ({
  activeSection: null,
  setActiveSection: (section) => set({ activeSection: section }),
  targetPosition: null,
  setTargetPosition: (position) => set({ targetPosition: position }),
  nearbySection: null,
  setNearbySection: (section) => set({ nearbySection: section }),
}));
