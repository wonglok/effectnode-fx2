import { SSR } from "@/vendor/r3f-postprocessing/dist/effects/SSR";
import { CameraControls, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Autofocus,
  Bloom,
  Depth,
  DepthOfField,
  EffectComposer,
  FXAA,
  N8AO,
  SSAO,
} from "@react-three/postprocessing";
import { EditorAutoHider } from "effectnode-developer-tools/effectnode-gui/editor-gui/EffectnodeGUI/EditorAutoHider";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";
import { Suspense, useCallback, useState } from "react";

export default function Page() {
  let [core, setCore] = useState(null);

  let onCoreReady = useCallback(
    ({ core }) => {
      console.log("core", core);
      setCore(core);
    },
    [setCore]
  );

  return (
    <>
      <EditorAutoHider
        fullscreen={false}
        title="space-me"
        onCoreReady={onCoreReady}
      >
        {<Content core={core}></Content>}
      </EditorAutoHider>
    </>
  );
}

function Content({ core = { store: false } }) {
  //
  return (
    <div className="w-full h-full relative">
      {/*  */}

      {/*  */}
      <Canvas shadows>
        <Suspense fallback={null}>
          <EffectNode
            useEditorStore={core?.store}
            projectName={"space-me"}
          ></EffectNode>

          <Environment files={[`/hdr/studiolighting.hdr`]}></Environment>
        </Suspense>

        <PostProcessing></PostProcessing>

        <OrbitControls object-position={[0, 0, 5]} makeDefault></OrbitControls>
      </Canvas>
      {/*  */}

      {/*  */}

      {/*  */}

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
    </div>
  );
}

function PostProcessing() {
  //
  let scene = useThree((s) => s.scene);
  let camera = useThree((s) => s.camera);

  return (
    <>
      <EffectComposer>
        <SSR
          //
          ior={1.5}
          intensity={0.5}
          jitter={0.15}
          scene={scene}
          camera={camera}
        ></SSR>

        <N8AO quality="performance" intensity={3}></N8AO>

        <Bloom mipmapBlur></Bloom>
      </EffectComposer>
    </>
  );
}
