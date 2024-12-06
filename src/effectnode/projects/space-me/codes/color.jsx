import { useEffect } from "react";

export function ToolBox({ useStore, useAutoSaveData }) {
  let baseColor = useAutoSaveData((r) => r.baseColor);
  return (
    <>
      <input
        type="color"
        value={baseColor}
        onChange={(va) => {
          useAutoSaveData.setState({
            baseColor: va.target.value,
          });
        }}
      />
    </>
  );
}

export function Runtime({ useAutoSaveData, io }) {
  let baseColor = useAutoSaveData((r) => r.baseColor);
  useEffect(() => {
    io.output(0, baseColor);
  }, [io, baseColor]);

  return <></>;
}
