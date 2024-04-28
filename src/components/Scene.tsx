import { Html, ScrollControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Model from "./Model";

function Loader() {
  const { progress } = useProgress();
  return <Html>{progress.toFixed(2)}%</Html>;
}

export default function Scene() {
  return (
    <Canvas gl={{ antialias: true }} className="relative h-full">
      <directionalLight position={[-5, -5, 5]} intensity={4} />
      <Suspense fallback={<Loader />}>
        <ScrollControls damping={0.2} pages={10}>
          <Model />
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
