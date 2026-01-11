import { Section } from "@/components/layout/Section";

export function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">About Me</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              I am a creative developer passionate about building digital products that look great and feel even better.
            </p>
            <p>
              With a background in engineering and a keen eye for design, I bridge the gap between technical feasibility and visual excellence.
            </p>
            <p>
              When I&apos;m not coding, you can find me writing about tech on my <a href="https://velog.io/@alice0751" target="_blank" className="text-white underline decoration-white/30 hover:decoration-white transition-all">Velog</a>.
            </p>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
             {/* Placeholder for profile image */}
             <span className="text-muted-foreground">Profile Image Placeholder</span>
        </div>
      </div>
    </Section>
  );
}
