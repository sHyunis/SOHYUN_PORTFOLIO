"use client";

import { motion } from "framer-motion";
import { Philosophy } from "@/components/about/Philosophy";
import { WorkExperience } from "@/components/experience/WorkExperience";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";
import { Footer } from "@/components/layout/Footer";
import { Guestbook } from "@/components/guestbook/Guestbook";

const SECTIONS = [
  { id: "about", label: "About", component: Philosophy, color: "#60a5fa" },
  { id: "work", label: "Work Experience", component: WorkExperience, color: "#a78bfa" },
  { id: "projects", label: "Projects", component: Projects, color: "#f472b6" },
  { id: "skills", label: "Skills", component: Skills, color: "#fbbf24" },
  { id: "contact", label: "Contact", component: Footer, color: "#fb923c" },
  { id: "guestbook", label: "Guestbook", component: Guestbook, color: "#34d399" },
];

export function Overview() {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Portfolio Overview
        </h1>
        <p className="text-white/60 text-lg">
          모든 섹션을 한눈에 살펴보세요
        </p>
      </motion.div>

      <div className="space-y-24">
        {SECTIONS.map((section, index) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div
              className="absolute -left-4 top-0 w-1 h-full rounded-full"
              style={{ backgroundColor: section.color }}
            />
            <div className="mb-8 pl-4">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                style={{ backgroundColor: `${section.color}20`, color: section.color }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ color: section.color }}
              >
                {section.label}
              </h2>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
              <section.component />
            </div>
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <p className="text-white/40 text-sm">
          포털을 통해 3D 월드로 돌아가려면 바깥을 클릭하세요
        </p>
      </motion.div>
    </div>
  );
}
