"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/components/data";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-20 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-card rounded-3xl p-8 hover:bg-white/5 transition-colors duration-500 border border-white/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.link && project.link !== "#" ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="text-sm text-gray-400">{project.period}</p>
                </div>
                {project.link && project.link !== "#" && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </a>
                )}
              </div>

              <p className="text-gray-300 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.slice(0, 4).map((feature, fIndex) => (
                    <li key={fIndex} className="text-sm text-gray-500 flex items-start">
                      <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {project.features.length > 4 && (
                    <li className="text-sm text-gray-600 italic">
                      + {project.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
