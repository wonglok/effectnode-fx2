import { SSR } from "@/vendor/r3f-postprocessing/dist/effects/SSR";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, N8AO } from "@react-three/postprocessing";
import { EffectNodeStudio } from "effectnode-developer-tools/effectnode-gui/editor-gui/EffectnodeGUI/EffectNodeStudio";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div className="w-full h-full relative overflow-hidden">
        <EffectNodeStudio projectName="magic">
          <Canvas gl={{ antialias: false }} shadows={"basic"}>
            <color attach={"background"} args={["#000000"]}></color>
            <Suspense fallback={null}>
              <EffectNode projectName={"magic"}></EffectNode>

              <Environment files={[`/hdr/studiolighting.hdr`]}></Environment>
            </Suspense>

            <PostProcessing></PostProcessing>

            <Ctrls></Ctrls>
          </Canvas>

          <div className=" absolute bottom-0 left-0 px-3 py-3">
            <div className="bg-white p-1 px-3">
              <a
                className="underline"
                target="_blank"
                href={`https://www.fab.com/listings/a926d36d-6460-4c6e-8aaa-c22667cb075f`}
              >
                Scene Credit
              </a>
            </div>
          </div>
        </EffectNodeStudio>
      </div>
    </>
  );
}

function Ctrls() {
  let gl = useThree((s) => s.gl);
  let camera = useThree((s) => s.camera);

  return (
    <OrbitControls
      regress={true}
      keyEvents={true}
      enableDamping
      args={[camera, gl.domElement]}
      object-position={[0, -1.6387593800344429, 6]}
      makeDefault
      target={[0, -1.6387593800344429, -11.182383796060732]}
    ></OrbitControls>
  );
}

function PostProcessing() {
  //
  let scene = useThree((s) => s.scene);
  let camera = useThree((s) => s.camera);

  return (
    <>
      <EffectComposer resolutionScale={0.5} multisampling={0}>
        {/* <SSR
          ior={1.5}
          intensity={0.5}
          jitter={0.15}
          scene={scene}
          camera={camera}
        ></SSR>

         */}

        <N8AO quality="performance" intensity={2.5}></N8AO>

        <Bloom mipmapBlur width={512} height={512}></Bloom>
      </EffectComposer>
    </>
  );
}
