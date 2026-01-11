import { Scene } from "@/components/3d/Scene";
import { Interface } from "@/components/ui/Interface";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black relative">
      <Scene />
      <Interface />
    </main>
  );
}
