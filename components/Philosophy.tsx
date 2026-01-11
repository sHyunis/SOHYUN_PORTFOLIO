"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/lib/data";

export function Philosophy() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto space-y-12">
        {PROFILE.philosophy.map((text, index) => (
          <PhilosophyItem key={index} text={text} index={index} />
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">{PROFILE.intro.title}</h3>
          <p className="text-gray-400 leading-relaxed text-lg">
            {PROFILE.intro.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function PhilosophyItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-2xl md:text-4xl font-medium text-center leading-relaxed text-white/90"
    >
      {text}
    </motion.p>
  );
}
