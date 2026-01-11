export const COLORS = {
  // Primary colors
  primary: {
    cyan: "#4fd1c5",
    blue: "#2997ff",
    skyBlue: "#38bdf8",
    skyBlueEmissive: "#0ea5e9",
  },

  // Background colors
  background: {
    dark: "#0a0a0a",
    darkest: "#111",
    slate: "#1e293b",
    slateDark: "#0f172a",
    veryDark: "#1d1d1f",
  },

  // Neutral colors
  neutral: {
    black: "#000000",
    darkGray: "#222",
    mediumGray: "#333",
    gray: "#444",
  },

  // White and transparency
  white: {
    base: "#ffffff",
    opacity10: "rgba(255, 255, 255, 0.1)",
    opacity20: "rgba(255, 255, 255, 0.2)",
    opacity50: "rgba(255, 255, 255, 0.5)",
    opacity60: "rgba(255, 255, 255, 0.6)",
    opacity70: "rgba(255, 255, 255, 0.7)",
    opacity80: "rgba(255, 255, 255, 0.8)",
    opacity90: "rgba(255, 255, 255, 0.9)",
  },

  // Black with transparency
  black: {
    base: "#000000",
    opacity40: "rgba(0, 0, 0, 0.4)",
    opacity60: "rgba(0, 0, 0, 0.6)",
  },

  // MiniMap section colors
  minimap: {
    about: "#60a5fa",
    work: "#a78bfa",
    projects: "#f472b6",
    skills: "#fbbf24",
    guestbook: "#34d399",
    contact: "#fb923c",
  },

  // Avatar colors
  avatar: {
    head: "#ffffff",
    body: "#1d1d1f",
    limbs: "#333333",
    accent: "#2997ff",
  },
} as const;

export type ColorKey = keyof typeof COLORS;
export type PrimaryColorKey = keyof typeof COLORS.primary;
export type BackgroundColorKey = keyof typeof COLORS.background;
export type NeutralColorKey = keyof typeof COLORS.neutral;
export type WhiteColorKey = keyof typeof COLORS.white;
export type MinimapColorKey = keyof typeof COLORS.minimap;
export type AvatarColorKey = keyof typeof COLORS.avatar;
