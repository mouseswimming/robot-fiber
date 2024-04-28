/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAnimations, useScroll, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AnimationAction, Group } from "three";

useGLTF.preload("/robot.glb");

export default function Model() {
  const robotRef = useRef<Group>(null);

  const { animations, scene } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    const action = actions["Experiment"] as AnimationAction;
    action.play().paused = true;
  }, [actions]);

  useFrame(() => {
    const action = actions["Experiment"] as AnimationAction;
    action.time = action.getClip().duration * scroll.offset;
  });

  return (
    <group ref={robotRef}>
      <primitive object={scene} />
    </group>
  );
}
