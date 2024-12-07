import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";

export default function Page() {
  return (
    <>
      <Canvas shadows>
        <EffectNode projectName={"space-me"}></EffectNode>

        <EffectComposer>
          <Bloom mipmapBlur></Bloom>
        </EffectComposer>
        <OrbitControls
          target={[0, 0, 29]}
          rotateSpeed={-1}
          object-position={[0, 0, 30]}
          makeDefault
        ></OrbitControls>
        <Environment files={[`/hdr/studiolighting.hdr`]}></Environment>
      </Canvas>

      {/*  */}
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
