"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/components/data";

export function Philosophy() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto space-y-12">
        {PROFILE.philosophy.map((text, index) => (
          <PhilosophyItem key={index} text={text} index={index} />
        ))}
        
        <div className="mt-20 space-y-8">
          {PROFILE.details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-cyan-400">{detail.title}</h3>
              <div className="space-y-2">
                {detail.content.map((line, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
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
