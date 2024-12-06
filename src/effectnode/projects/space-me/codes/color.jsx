import { useEffect } from "react";

export function ToolBox({ useStore, useBoxData }) {
  let baseColor = useBoxData((r) => r.baseColor);
  return (
    <>
      <input
        type="color"
        value={baseColor}
        onChange={(va) => {
          useBoxData.setState({
            baseColor: va.target.value,
          });
        }}
      />
    </>
  );
}

export function Runtime({ useBoxData, io }) {
  // let Insert3D = useStore((r) => r.Insert3D) || (() => null);
  let baseColor = useBoxData((r) => r.baseColor);
  useEffect(() => {
    io.output(0, baseColor);
  }, [io, baseColor]);

  return <>{/* <Insert3D></Insert3D> */}</>;
}
