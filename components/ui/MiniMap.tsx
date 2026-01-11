"use client";

import { useRef, useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { avatarPosition } from "@/store/avatarPosition";
import { HOUSE_POSITIONS } from "@/components/3d/constants";
import { COLORS } from "@/constants/colors";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "about", label: "About", color: COLORS.minimap.about },
  { id: "work", label: "Work", color: COLORS.minimap.work },
  { id: "projects", label: "Projects", color: COLORS.minimap.projects },
  { id: "skills", label: "Skills", color: COLORS.minimap.skills },
  { id: "guestbook", label: "Guest", color: COLORS.minimap.guestbook },
  { id: "contact", label: "Contact", color: COLORS.minimap.contact },
];

const MAP_SIZE = 90;
const PADDING = 12;

export function MiniMap() {
  const [avatarMapPos, setAvatarMapPos] = useState({ x: MAP_SIZE / 2, y: MAP_SIZE / 2 });
  const animationRef = useRef<number | null>(null);
  const setTargetPosition = useGameStore((state) => state.setTargetPosition);
  const nearbySection = useGameStore((state) => state.nearbySection);

  const worldToMap = (x: number, z: number) => {
    const usableSize = MAP_SIZE - PADDING * 2;
    const mapX = PADDING + ((x + 10) / 20) * usableSize;
    const mapZ = PADDING + ((z + 10) / 24) * usableSize;
    return { x: mapX, y: mapZ };
  };

  useEffect(() => {
    const updatePosition = () => {
      const newMapPos = worldToMap(avatarPosition.x, avatarPosition.z);
      setAvatarMapPos(newMapPos);
      animationRef.current = requestAnimationFrame(updatePosition);
    };

    animationRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleSectionClick = (sectionId: string) => {
    const pos = HOUSE_POSITIONS[sectionId as keyof typeof HOUSE_POSITIONS];
    if (pos) {
      setTargetPosition([pos[0], 0, pos[2] + 2.5]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed top-6 right-6 z-50 pointer-events-auto"
    >
      <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-xl p-2 shadow-2xl">
        <svg width={MAP_SIZE} height={MAP_SIZE} className="relative overflow-visible">
          <defs>
            <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
            </pattern>
            {SECTIONS.map(s => (
              <filter key={`glow-${s.id}`} id={`glow-${s.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            ))}
          </defs>
          <rect width={MAP_SIZE} height={MAP_SIZE} fill="url(#grid)" rx="4" />

          {SECTIONS.map((section) => {
            const pos = HOUSE_POSITIONS[section.id as keyof typeof HOUSE_POSITIONS];
            if (!pos) return null;

            const mapPos = worldToMap(pos[0], pos[2]);
            const isNearby = nearbySection === section.id;

            return (
              <g
                key={section.id}
                className="cursor-pointer group"
                onClick={() => handleSectionClick(section.id)}
              >
                <circle
                  cx={mapPos.x}
                  cy={mapPos.y}
                  r={10}
                  fill="transparent"
                />

                <circle
                  cx={mapPos.x}
                  cy={mapPos.y}
                  r={isNearby ? 5 : 3.5}
                  fill={section.color}
                  className="transition-all duration-300"
                  style={{
                    filter: isNearby ? `url(#glow-${section.id})` : 'none',
                    opacity: isNearby ? 1 : 0.7,
                    stroke: 'white',
                    strokeWidth: isNearby ? 1.5 : 0
                  }}
                />

                <text
                  x={mapPos.x}
                  y={mapPos.y - 8}
                  fontSize="7"
                  fontWeight="bold"
                  fill={isNearby ? "white" : "rgba(255,255,255,0.5)"}
                  textAnchor="middle"
                  className="font-mono pointer-events-none transition-all duration-300 group-hover:fill-white"
                >
                  {section.label}
                </text>
              </g>
            );
          })}

          <g pointerEvents="none">
            <circle
              cx={avatarMapPos.x}
              cy={avatarMapPos.y}
              r="3"
              fill="#fff"
              className="animate-pulse"
              style={{ filter: 'drop-shadow(0 0 3px white)' }}
            />
            <circle
              cx={avatarMapPos.x}
              cy={avatarMapPos.y}
              r="5"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              opacity="0.3"
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
