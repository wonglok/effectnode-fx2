import { Box, Html, PivotControls } from "@react-three/drei";
import { useMemo } from "react";
import { Quaternion, Vector3 } from "three";
import { Matrix4 } from "three";

export function ToolBox({ useAutoSaveData }) {
  return <></>;
}

export function Runtime({ useAutoSaveData, io, files }) {
  //
  let lightColor = useAutoSaveData((r) => r.lightColor) || "#ffffff";
  let intensity = useAutoSaveData((r) => r.intensity) || 1;

  //
  return (
    <>
      {/*  */}

      <MoverGate name="light2" useAutoSaveData={useAutoSaveData}>
        <pointLight color={lightColor} intensity={intensity}></pointLight>
      </MoverGate>

      <MoverGate name="light3" useAutoSaveData={useAutoSaveData}>
        <pointLight color={lightColor} intensity={intensity}></pointLight>
      </MoverGate>

      <group>
        {/* <pointLight
          intensity={intensity}
          color={lightColor}
          position={[
            -14.104092376040242, -2.0109753853309202, -20.02041405731383,
          ]}
        ></pointLight> */}

        <pointLight
          intensity={intensity}
          color={lightColor}
          position={[22.0973094478636, -5.32978595305698, -20.045753251723227]}
        ></pointLight>
      </group>

      {/*   */}
    </>
  );
}

function MoverGate({ name = "light1", useAutoSaveData, children }) {
  let moveData =
    useAutoSaveData((r) => r[name]) || new Matrix4().identity().toArray();

  let gizmo = useAutoSaveData((r) => r.gizmo) || false;
  let { m4, position, scale, quaternion } = useMemo(() => {
    let m4 = new Matrix4().fromArray(moveData);

    let position = new Vector3(0, 0, 0);
    let quaternion = new Quaternion().identity();
    let scale = new Vector3(0, 0, 0);
    m4.decompose(position, quaternion, scale);

    return {
      m4,
      position: position.toArray(),
      scale: scale.toArray(),
      quaternion: quaternion.toArray(),
    };
  }, [moveData]);

  return moveData && gizmo && process.env.NODE_ENV === "development" ? (
    <PivotControls
      matrix={m4}
      scale={10}
      onDrag={(ev) => {
        useAutoSaveData.setState({
          [name]: ev.toArray(),
        });
      }}
    >
      <group scale={scale}>{children}</group>
      <Html center transform position={[10, 0, 0]} scale={2}>
        <button
          className="bg-white px-3 py-1"
          onClick={() => {
            let ev = new Matrix4().identity();
            ev.copyPosition(m4);
            useAutoSaveData.setState({
              [name]: ev.toArray(),
            });
          }}
        >
          Reset Pivot
        </button>
      </Html>
    </PivotControls>
  ) : (
    <group position={position} scale={scale} quaternion={quaternion}>
      {children}
    </group>
  );
}

export function NodeBox({ useAutoSaveData }) {
  return (
    <Html
      center
      className="bg-white z-50"
      position={[0, 0, 1.3]}
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
        <GizmoMove useAutoSaveData={useAutoSaveData}></GizmoMove>
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

function GizmoMove({ useAutoSaveData }) {
  let name = "gizmo";
  let value = useAutoSaveData((r) => r[name]);
  return (
    <div>
      {" Gismo: "}
      <input
        type="checkbox"
        checked={value}
        onChange={() => {
          useAutoSaveData.setState({
            [name]: !value,
          });
        }}
      ></input>
    </div>
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
