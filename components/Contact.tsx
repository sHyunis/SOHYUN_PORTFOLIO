import { Section } from "@/components/Section";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <Section id="contact" className="mb-24">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-7xl font-bold mb-8">Let&apos;s work together</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s create something amazing.
        </p>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
        >
          Get in touch <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>
    </Section>
  );
}
