"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/components/data";

export function Skills() {
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-20 text-center"
        >
          Skills & Tools
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-lg bg-black/40 text-gray-300 text-sm border border-white/5 hover:border-white/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
