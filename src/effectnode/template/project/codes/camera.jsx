import { PerspectiveCamera } from "@react-three/drei";

export function ToolBox({}) {
  return <></>;
}

export function Runtime({ io }) {
  return (
    <>
      <>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 2.5]}
        ></PerspectiveCamera>
      </>
    </>
  );
}
