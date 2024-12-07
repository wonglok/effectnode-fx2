import { Html } from "@react-three/drei";

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

export function NodeBox({ useAutoSaveData }) {
  return (
    <Html
      center
      className="bg-white z-50"
      position={[0, 0, 1]}
      rotation={[Math.PI * 0.5, 0, 0]}
      scale={[1, 1, 1]}
    >
      <div
        onMouseDownCapture={(e) => {
          e.stopPropagation();
        }}
        onMouseMoveCapture={(e) => {
          e.stopPropagation();
        }}
        onPointerDownCapture={(e) => {
          e.stopPropagation();
        }}
        onPointerMoveCapture={(e) => {
          e.stopPropagation();
        }}
        className="w-full h-full"
      >
        <InputRange
          name={`intensity`}
          max={200}
          useAutoSaveData={useAutoSaveData}
        ></InputRange>
        <InputColor
          name={`lightColor`}
          useAutoSaveData={useAutoSaveData}
        ></InputColor>
      </div>
    </Html>
  );
}

function InputColor({ name, useAutoSaveData }) {
  let value = useAutoSaveData((r) => r[name]);

  return (
    <input
      className=""
      type="color"
      value={value}
      onChange={(va) => {
        useAutoSaveData.setState({
          [name]: va.target.value,
        });
      }}
    />
  );
}

function InputRange({ name, step = 0.1, min = 0, max = 20, useAutoSaveData }) {
  let value = useAutoSaveData((r) => r[name]);

  return (
    <input
      className=""
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(va) => {
        useAutoSaveData.setState({
          [name]: va.target.value,
        });
      }}
    />
  );
}
