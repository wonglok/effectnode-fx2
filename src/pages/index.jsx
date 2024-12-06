import { Canvas } from "@react-three/fiber";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";

export default function Page() {
  return (
    <>
      <Canvas>
        <EffectNode projectName={"space-me"}></EffectNode>
      </Canvas>
    </>
  );
}
