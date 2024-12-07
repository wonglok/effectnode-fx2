import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, N8AO } from "@react-three/postprocessing";
import { EditorShell } from "effectnode-developer-tools/effectnode-gui/editor-gui/EffectnodeGUI/EditorShell";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";
import { Suspense } from "react";
import { SSR } from "../vendor/r3f-postprocessing/dist/effects/SSR/index";

//

export default function Page() {
  return (
    <>
      <EditorShell title="space-me">
        <Content></Content>
      </EditorShell>
      {/*  */}
    </>
  );
  //
}

function Content({}) {
  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <Suspense fallback={null}>
          <EffectNode projectName={"space-me"}></EffectNode>
          <Environment files={[`/hdr/studiolighting.hdr`]}></Environment>
        </Suspense>

        <PostProcessing></PostProcessing>

        <OrbitControls
          target={[0, -3, -7]}
          rotateSpeed={-1}
          object-position={[0, 0, 30]}
          makeDefault
        ></OrbitControls>
      </Canvas>
      <div className=" absolute bottom-0 left-0 px-3 py-3">
        <div className="bg-white p-1 px-3">
          <a
            className="underline"
            href={`https://www.fab.com/listings/a926d36d-6460-4c6e-8aaa-c22667cb075f`}
          >
            Scene Credit
          </a>
        </div>
      </div>
    </div>
  );
}

function PostProcessing() {
  let scene = useThree((s) => s.scene);
  let camera = useThree((s) => s.camera);
  return (
    <>
      <EffectComposer>
        <SSR
          //
          intensity={1.0}
          jitter={0.25}
          scene={scene}
          camera={camera}
        >
          {/*  */}
        </SSR>

        <N8AO intensity={4.0}></N8AO>
        <Bloom mipmapBlur></Bloom>
      </EffectComposer>
    </>
  );
}
