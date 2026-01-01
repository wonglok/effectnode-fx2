import { Box, Html, MeshTransmissionMaterial, Sphere } from "@react-three/drei";
import { useEffect, useState } from "react";

export function ToolBox({ useStore, useAutoSaveData }) {
  return <>
    123
  </>;
}

export function Runtime({ useAutoSaveData, io }) {
  let baseColor = useAutoSaveData((r) => r.baseColor);

  let [colorSync, setColor] = useState('')
  useEffect(() => {
    io.output(0, baseColor);

    io.input(0, (v) => {
      console.log(v)
      setColor(v)
    })
  }, [io, baseColor]);

  return <>
    <Sphere>
      <MeshTransmissionMaterial transmission={1} roughness={0} thickness={2} color={colorSync}></MeshTransmissionMaterial>
    </Sphere>
  </>;
}

export function NodeBox({ useAutoSaveData }) {
  return (
    <Html position={[0, 0, -1]} center className="bg-white">
      <InputColor useAutoSaveData={useAutoSaveData}></InputColor>
    </Html>
  );
}

function InputColor({ useAutoSaveData }) {
  let baseColor = useAutoSaveData((r) => r.baseColor);

  return (
    <input
      type="color"
      value={baseColor}
      onChange={(va) => {
        useAutoSaveData.setState({
          baseColor: va.target.value,
        });
      }}
    />
  );
}

//
