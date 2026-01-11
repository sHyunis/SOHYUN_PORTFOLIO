"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/data";

export function WorkExperience() {
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-20 text-center"
        >
          Work Experience
        </motion.h2>

        <div className="space-y-20">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                <p className="text-gray-400">{exp.period}</p>
                <p className="text-accent font-medium">{exp.role}</p>
                <p className="text-sm text-gray-500">{exp.description}</p>
              </div>

              <div className="space-y-12 relative border-l border-white/10 pl-8 md:pl-12">
                {exp.projects.map((project, pIndex) => (
                  <div key={pIndex} className="relative">
                    <div className="absolute -left-[37px] md:-left-[53px] top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                    <h4 className="text-xl font-bold text-white mb-4">{project.title}</h4>
                    <ul className="space-y-3">
                      {project.details.map((detail, dIndex) => (
                        <li key={dIndex} className="text-gray-400 leading-relaxed flex items-start">
                          <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
