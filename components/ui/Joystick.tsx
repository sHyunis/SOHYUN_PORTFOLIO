"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { COLORS } from "@/constants/colors";

export function Joystick() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setJoystickInput, activeSection } = useGameStore();

  const maxDistance = 40; // Maximum distance from center

  useEffect(() => {
    if (!isDragging) {
      setPosition({ x: 0, y: 0 });
      setJoystickInput({ x: 0, y: 0 });
      return;
    }

    const handleMove = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let deltaX = clientX - centerX;
      let deltaY = clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        deltaX = Math.cos(angle) * maxDistance;
        deltaY = Math.sin(angle) * maxDistance;
      }

      setPosition({ x: deltaX, y: deltaY });

      // Normalize for game input (-1 to 1)
      const normalizedX = deltaX / maxDistance;
      const normalizedY = deltaY / maxDistance;

      setJoystickInput({ x: normalizedX, y: normalizedY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, setJoystickInput]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeSection) return;
    e.preventDefault();
    setIsDragging(true);
  };

  if (activeSection) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <div
        ref={containerRef}
        className="relative w-32 h-32 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Base circle */}
        <div className="absolute inset-4 border-2 border-white/20 rounded-full" />

        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-white/30 rounded-full" />

        {/* Direction indicators */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <div className="w-6 h-6 flex items-center justify-center text-white/40 text-xs">▲</div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className="w-6 h-6 flex items-center justify-center text-white/40 text-xs">▼</div>
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <div className="w-6 h-6 flex items-center justify-center text-white/40 text-xs">◀</div>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="w-6 h-6 flex items-center justify-center text-white/40 text-xs">▶</div>
        </div>

        {/* Joystick handle */}
        <div
          className="absolute w-12 h-12 rounded-full transition-all"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            background: isDragging
              ? `radial-gradient(circle, ${COLORS.primary.skyBlue}, ${COLORS.primary.skyBlueEmissive})`
              : `radial-gradient(circle, ${COLORS.white.opacity70}, ${COLORS.white.opacity50})`,
            boxShadow: isDragging
              ? `0 0 20px ${COLORS.primary.skyBlueEmissive}`
              : "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute inset-2 border-2 border-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
