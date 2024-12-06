import { useEffect } from "react";

export function ToolBox({ useBoxData }) {
  let lightColor = useBoxData((r) => r.lightColor) || "#ffffff";
  let intensity = useBoxData((r) => r.intensity) || 1;

  return (
    <>
      <input
        type="color"
        value={lightColor}
        onChange={(e) => {
          useBoxData.setState({ lightColor: e.target.value });
        }}
      ></input>
      <input
        type="range"
        min={0}
        max={10}
        step={0.01}
        value={intensity}
        onChange={(e) => {
          useBoxData.setState({ intensity: e.target.value });
        }}
      ></input>
    </>
  );
}

export function Runtime({ useBoxData, io }) {
  let lightColor = useBoxData((r) => r.lightColor) || "#ffffff";
  let intensity = useBoxData((r) => r.intensity) || 1;
  return (
    <>
      <pointLight
        intensity={intensity}
        color={lightColor}
        position={[-1.5, 0.5, 1]}
      ></pointLight>
    </>
  );
}

//

//

//
