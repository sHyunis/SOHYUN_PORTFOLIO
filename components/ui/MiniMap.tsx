"use client";

import { useGameStore } from "@/store/gameStore";
import { HOUSE_POSITIONS } from "@/components/3d/constants";
import { COLORS } from "@/constants/colors";

const SECTIONS = [
  { id: "about", label: "About", color: COLORS.minimap.about },
  { id: "work", label: "Work", color: COLORS.minimap.work },
  { id: "projects", label: "Projects", color: COLORS.minimap.projects },
  { id: "skills", label: "Skills", color: COLORS.minimap.skills },
  { id: "guestbook", label: "Guest", color: COLORS.minimap.guestbook },
  { id: "contact", label: "Contact", color: COLORS.minimap.contact },
];

export function MiniMap() {
  const { avatarPosition, setTargetPosition, nearbySection } = useGameStore();

  // Convert 3D world coordinates to 2D minimap coordinates
  const worldToMap = (x: number, z: number) => {
    // World bounds: roughly -10 to 10 for x, -10 to 14 for z
    const mapWidth = 90;
    const mapHeight = 90;

    // Scale and center
    const mapX = ((x + 10) / 20) * mapWidth;
    const mapZ = ((z + 10) / 24) * mapHeight;

    return { x: mapX, y: mapZ };
  };

  const handleSectionClick = (sectionId: string) => {
    const pos = HOUSE_POSITIONS[sectionId as keyof typeof HOUSE_POSITIONS];
    if (pos) {
      setTargetPosition([pos[0], 0, pos[2] + 1.5]);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-auto">
      <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-2">
        <div className="text-white/50 text-[10px] mb-1 text-center font-mono">MAP</div>
        <svg width="90" height="90" className="relative">
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="90" height="90" fill="url(#grid)" />

          {/* Center marker */}
          <circle cx="45" cy="45" r="0.8" fill="white" opacity="0.3" />

          {/* House positions */}
          {SECTIONS.map((section) => {
            const pos = HOUSE_POSITIONS[section.id as keyof typeof HOUSE_POSITIONS];
            if (!pos) return null;

            const mapPos = worldToMap(pos[0], pos[2]);
            const isNearby = nearbySection === section.id;

            return (
              <g key={section.id}>
                <circle
                  cx={mapPos.x}
                  cy={mapPos.y}
                  r={isNearby ? 5 : 3}
                  fill={section.color}
                  opacity={isNearby ? 1 : 0.6}
                  className="cursor-pointer transition-all hover:opacity-100"
                  onClick={() => handleSectionClick(section.id)}
                  style={{ filter: isNearby ? 'drop-shadow(0 0 3px currentColor)' : 'none' }}
                />
                {isNearby && (
                  <text
                    x={mapPos.x}
                    y={mapPos.y - 9}
                    fontSize="7"
                    fill="white"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {section.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Avatar position */}
          {avatarPosition && (
            <g>
              <circle
                cx={worldToMap(avatarPosition[0], avatarPosition[2]).x}
                cy={worldToMap(avatarPosition[0], avatarPosition[2]).y}
                r="2.5"
                fill="#fff"
                className="animate-pulse"
              />
              <circle
                cx={worldToMap(avatarPosition[0], avatarPosition[2]).x}
                cy={worldToMap(avatarPosition[0], avatarPosition[2]).y}
                r="4"
                fill="none"
                stroke="#fff"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
