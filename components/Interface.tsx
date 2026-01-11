"use client";

import { useGameStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WorkExperience } from "@/components/WorkExperience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Philosophy } from "@/components/Philosophy";
import { Footer } from "@/components/Footer";

export function Interface() {
  const { activeSection, setActiveSection } = useGameStore();

  return (
    <>
      {/* HUD */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <h1 className="text-4xl font-bold mb-2 tracking-tighter text-gradient-space text-space-glow">
          Jung Sohyun
        </h1>
        <p className="text-sm text-cyan-400/80 font-mono tracking-widest uppercase">
          Frontend Developer
        </p>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full flex justify-center">
        <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white/50 text-sm font-mono">
          <div className="hidden md:flex gap-2 items-center">
            <span className="px-2 py-1 bg-white/10 rounded">W</span>
            <span className="px-2 py-1 bg-white/10 rounded">A</span>
            <span className="px-2 py-1 bg-white/10 rounded">S</span>
            <span className="px-2 py-1 bg-white/10 rounded">D</span>
            <span>or Click to move</span>
          </div>
          <div className="md:hidden flex gap-2 items-center animate-pulse">
            <span>Tap anywhere to move</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setActiveSection(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.5, duration: 0.5 }} // Delay for camera zoom
              className="bg-black/80 backdrop-blur-2xl w-full h-full md:w-[90vw] md:h-[90vh] overflow-y-auto rounded-none md:rounded-3xl border-none md:border border-white/10 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveSection(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <div className="p-6 md:p-12">
                {activeSection === "about" && <Philosophy />}
                {activeSection === "work" && <WorkExperience />}
                {activeSection === "projects" && <Projects />}
                {activeSection === "skills" && <Skills />}
                {activeSection === "contact" && <Footer />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
