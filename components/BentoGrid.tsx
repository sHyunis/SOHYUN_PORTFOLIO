"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  title: string;
  description: string;
  href: string;
  className?: string;
  background?: React.ReactNode;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8", className)}>
      {children}
    </div>
  );
}

export function BentoCard({ title, description, href, className, background }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-card border border-white/10 p-6 md:p-8 flex flex-col justify-between h-[400px]",
        className
      )}
    >
      <div className="absolute inset-0 z-0 transition-opacity duration-500 group-hover:opacity-80">
        {background}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

      <div className="relative z-20 flex justify-end">
        <Link
          href={href}
          target="_blank"
          className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="relative z-20">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-muted-foreground group-hover:text-white/80 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
