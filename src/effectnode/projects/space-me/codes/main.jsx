import { Gltf } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";

export function ToolBox({ projectName, useStore }) {
  return (
    <>
      <Canvas>
        <EffectNode projectName={projectName}></EffectNode>
      </Canvas>
      {/*  */}
      {/*  */}
    </>
  );
}

export function Runtime({ files, useStore, io }) {
  return (
    <>
      <group scale={0.2} position={[1, 0, 0]}></group>
    </>
  );
}
