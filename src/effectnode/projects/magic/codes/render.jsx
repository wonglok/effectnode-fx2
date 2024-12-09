// import { Box, PerspectiveCamera } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import {
  Box,
  // Environment,
  Gltf,
  Html,
  PivotControls,
  TransformControls,
  useGLTF,
  // OrbitControls,
  // PerspectiveCamera,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BoxGeometry,
  CircleGeometry,
  ConeGeometry,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Quaternion,
  ShaderMaterial,
  StaticReadUsage,
  Vector3,
} from "three";
// import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import fragmentShader from "./shader/ball.fs";
import vertexShader from "./shader/ball.vs";
import { useFrame } from "@react-three/fiber";

export function ToolBox({ projectName }) {
  ///
  return <>{/*  */}</>;
}

export function Runtime({ io, files, onLoop, useAutoSaveData, isEditing }) {
  const [countX, setStateX] = useState(100);
  const [countY, setStateY] = useState(100);
  const [countZ, setStateZ] = useState(100);

  useEffect(() => {
    io.in(0, (config) => {
      setStateX(config.countX);
      setStateY(config.countY);
      setStateZ(config.countZ);
    });
  }, [io]);

  const [gpuInfo, setGPU] = useState(false);
  useEffect(() => {
    io.in(1, (gpuInfo) => {
      setGPU(gpuInfo);
    });
  }, [io]);

  console.log(gpuInfo);

  let count = useMemo(() => {
    return countX * countY * countZ;
  }, [countX, countY, countZ]);

  let baseGeometry = useMemo(() => {
    //
    let box = new BoxGeometry(0.002, 0.002, 0.002);

    return box.toNonIndexed();
  }, []);

  let geometry = useMemo(() => {
    let geometryBase = new InstancedBufferGeometry();
    geometryBase.copy(baseGeometry);
    geometryBase.instanceCount = count;

    let offsets = [];
    let rot = [];
    let puv = [];
    let idx = [];

    let ii = 0;
    for (let z = 0; z < countZ; z++) {
      for (let y = 0; y < countY; y++) {
        for (let x = 0; x < countX; x++) {
          offsets.push(Math.random() * 10 - 5.0);
          offsets.push(Math.random() * 10 - 5.0);
          offsets.push(Math.random() * 10 - 5.0);

          rot.push(Math.PI * Math.random());
          rot.push(Math.PI * Math.random());
          rot.push(Math.PI * Math.random());

          idx.push(ii);
          ii++;
        }
      }
    }

    let dimension = Math.sqrt(count, 1 / 2);

    for (let ry = 0; ry < dimension; ry++) {
      for (let rx = 0; rx < dimension; rx++) {
        puv.push(rx / dimension);
        puv.push(ry / dimension);
      }
    }

    geometryBase.setAttribute(
      "offsets",
      new InstancedBufferAttribute(new Float32Array(offsets), 3)
    );
    geometryBase.setAttribute(
      "rot",
      new InstancedBufferAttribute(new Float32Array(rot), 3)
    );
    geometryBase.setAttribute(
      "puv",
      new InstancedBufferAttribute(new Float32Array(puv), 2)
    );

    return geometryBase;
  }, [baseGeometry, count, countX, countY, countZ]);

  let shader = useMemo(() => {
    let shader = new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        uvTex: { value: null },
        varPosition: { value: null },
        varVelocity: { value: null },
      },
      side: DoubleSide,
    });

    return shader;
  }, []);
  useFrame((st, dt) => {
    if (shader) {
      shader.uniforms.time.value = window.performance.now() / 1000;
    }
  });

  //
  let [{ mesh, display }, setAPI] = useState(() => {
    //

    return {
      mesh: new Object3D(),
      display: <group></group>,
    };
    //
  });
  //

  // attach the gpuInfo to the geometry and shader
  //
  useEffect(() => {
    // console.log(gpuInfo.uvInfo);

    // console.log("gpuInfo.uvInfo.array", gpuInfo.uvInfo.array.length);
    // console.log(
    //   "geometry.attributes.puv",
    //   geometry.attributes.puv.array.length
    // );

    if (gpuInfo) {
      geometry.setAttribute(
        "tuv",
        new InstancedBufferAttribute(new Float32Array(gpuInfo.uvInfo.array), 2)
      );

      geometry.needsUpdate = true;

      shader.uniforms.uvTex = { value: gpuInfo.uvInfo.tex };

      shader.uniforms.varPosition = { value: null };
      shader.uniforms.varVelocity = { value: null };

      let mm = new Mesh(geometry, shader);

      mm.frustumCulled = false;

      setAPI({
        mesh: mm,
        display: <primitive object={mm}></primitive>,
      });
    }
  }, [gpuInfo, shader, geometry]);

  useFrame(() => {
    if (gpuInfo) {
      shader.uniforms.varPosition = {
        value: gpuInfo.gpu.getCurrentRenderTarget(gpuInfo.varPosition.variable)
          .texture,
      };
      shader.uniforms.varVelocity = {
        value: gpuInfo.gpu.getCurrentRenderTarget(gpuInfo.varVelocity.variable)
          .texture,
      };
    }
  });

  //

  //

  return (
    <>
      <MoverGate
        name="magic-ball"
        isEditing={isEditing}
        useAutoSaveData={useAutoSaveData}
      >
        {display}
      </MoverGate>
    </>
  );
}

function MoverGate({
  show = false,
  isEditing,
  name = "MagicBall",
  useAutoSaveData,
  children,
}) {
  //
  let moveData =
    useAutoSaveData((r) => r[name]) || new Matrix4().identity().toArray();

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

  // console.log(position);

  return isEditing &&
    show &&
    moveData &&
    process.env.NODE_ENV === "development" ? (
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
      <Html center transform position={[0, 15, 0]} scale={2}>
        <button className="bg-white px-3 py-1">{name}</button>
      </Html>
      <Html center transform position={[20, 0, 0]} scale={2}>
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
