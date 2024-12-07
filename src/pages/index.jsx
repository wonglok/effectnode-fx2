import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import {
  EditorRoot,
  Insert2D,
  Output2D,
} from "effectnode-developer-tools/effectnode-gui/editor-gui/EffectnodeGUI/EditorRoot";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";

export default function Page() {
  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <div className=" absolute top-0 left-0 w-full h-full">
          <EditorRoot
            preview={
              <>
                <Content title={"space-me"}></Content>
              </>
            }
            title={`space-me`}
          ></EditorRoot>
        </div>
      ) : (
        <>
          <Content title={"space-me"}></Content>
        </>
      )}

      {/*  */}
    </>
  );
}

function Content({ title }) {
  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <EffectNode projectName={title}></EffectNode>

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
