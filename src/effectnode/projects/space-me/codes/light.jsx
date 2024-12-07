import { Environment } from "@react-three/drei";
import { useEffect } from "react";

export function ToolBox({ useAutoSaveData }) {
  let lightColor = useAutoSaveData((r) => r.lightColor) || "#ffffff";
  let intensity = useAutoSaveData((r) => r.intensity) || 1;

  return (
    <>
      <input
        type="color"
        value={lightColor}
        onChange={(e) => {
          useAutoSaveData.setState({ lightColor: e.target.value });
        }}
      ></input>
      {/*  */}
      <input
        type="range"
        min={0}
        max={10}
        step={0.01}
        value={intensity}
        onChange={(e) => {
          useAutoSaveData.setState({ intensity: e.target.value });
        }}
      ></input>
    </>
  );
}

export function Runtime({ useAutoSaveData, io, files }) {
  let lightColor = useAutoSaveData((r) => r.lightColor) || "#ffffff";
  let intensity = useAutoSaveData((r) => r.intensity) || 1;

  //
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
