"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
    >
      <nav className="pointer-events-auto flex items-center gap-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
        <Link href="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
          Home
        </Link>
        <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          Work
        </Link>
        <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          Projects
        </Link>
        <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          Contact
        </Link>
      </nav>
    </motion.header>
  );
}
