import { Scene } from "@/components/3d/Scene";
import { Interface } from "@/components/Interface";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black relative">
      <Scene />
      <Interface />
    </main>
  );
}
