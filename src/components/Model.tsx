/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAnimations, useScroll, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group } from "three";

useGLTF.preload("/robot.glb");

export default function Model() {
  const robotRef = useRef<Group>(null);

  const { animations, scene } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    //@ts-ignore
    actions["Experiment"].play().paused = true;
  }, [actions]);

  useFrame(
    () =>
      //@ts-ignore
      (actions["Experiment"].time =
        //@ts-ignore
        actions["Experiment"].getClip().duration * scroll.offset)
  );

  return (
    <group ref={robotRef}>
      <primitive object={scene} />
    </group>
  );
}
