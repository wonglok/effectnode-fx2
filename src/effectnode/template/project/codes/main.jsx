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

export function Runtime({ ui, useStore, io }) {
  return <></>;
}
