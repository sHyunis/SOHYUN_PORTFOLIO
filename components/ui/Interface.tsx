"use client";

import { useGameStore } from "@/store/gameStore";
import { AnimatePresence, motion } from "framer-motion";
import { WorkExperience } from "@/components/experience/WorkExperience";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { Philosophy } from "@/components/about/Philosophy";
import { Footer } from "@/components/layout/Footer";
import { Guestbook } from "@/components/guestbook/Guestbook";
import { MiniMap } from "@/components/ui/MiniMap";
import { Joystick } from "@/components/ui/Joystick";
import { HOUSE_POSITIONS } from "@/components/3d/constants";



export function Interface() {
  const { activeSection, setActiveSection, setTargetPosition } = useGameStore();

  const handleClose = () => {
    if (activeSection) {
      const housePos = HOUSE_POSITIONS[activeSection as keyof typeof HOUSE_POSITIONS];
      if (housePos) {
        setTargetPosition([housePos[0], 0, housePos[2] + 6]);
      }
    }
    setActiveSection(null);
  };

  return (
    <>
      {/* HUD */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <h1 className="text-4xl font-bold mb-2 tracking-tighter text-gradient-space text-space-glow">
          Jung Sohyun
        </h1>
        <p className="text-cyan-400/80 font-mono tracking-widest uppercase text-sm">
          Frontend Developer
        </p>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm pointer-events-none text-center">
        <p className="mb-2">WASD to Move • Drag to Look • Scroll to Zoom</p>
        <p className="text-xs opacity-50">Click ground to move</p>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-12"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] w-full max-w-5xl h-[85vh] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white z-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 py-8">
                {activeSection === "about" && <Philosophy />}
                {activeSection === "work" && <WorkExperience />}
                {activeSection === "projects" && <Projects />}
                {activeSection === "skills" && <Skills />}
                {activeSection === "contact" && <Footer />}
                {activeSection === "guestbook" && <Guestbook />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* MiniMap */}
      {!activeSection && <MiniMap />}

      {/* Joystick */}
      <Joystick />
    </>
  );
}
