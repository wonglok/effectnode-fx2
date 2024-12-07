import { Canvas } from "@react-three/fiber";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";

export default function Page() {
  return (
    <>
      <Canvas>
        <EffectNode projectName={"space-me"}></EffectNode>
      </Canvas>
      <div className=" absolute bottom-0 left-0 px-3 py-3">
        <div>
          <a
            className="underline"
            href={`https://www.fab.com/listings/a926d36d-6460-4c6e-8aaa-c22667cb075f`}
          >
            Scene Credit
          </a>
        </div>
      </div>
    </>
  );
}
