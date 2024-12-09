// // import { Box, PerspectiveCamera } from "@react-three/drei";
// // import { useFrame } from "@react-three/fiber";
// import {
//   Box,
//   // Environment,
//   Gltf,
//   PivotControls,
//   TransformControls,
//   useGLTF,
//   // OrbitControls,
//   // PerspectiveCamera,
// } from "@react-three/drei";
// import { useEffect, useMemo, useRef, useState } from "react";
// import {
//   BoxGeometry,
//   CircleGeometry,
//   ConeGeometry,
//   DoubleSide,
//   InstancedBufferAttribute,
//   InstancedBufferGeometry,
//   Mesh,
//   MeshStandardMaterial,
//   ShaderMaterial,
//   StaticReadUsage,
// } from "three";
// // import { clone } from "three/examples/jsm/utils/SkeletonUtils";
// import fragmentShader from "./shader/ball.fs";
// import vertexShader from "./shader/ball.vs";

import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FloatType, Vector2, Vector3 } from "three";
import { GPUComputationRenderer } from "three-stdlib";
import texturePosition from "./compute/texturePosition.fs";
import textureVelocity from "./compute/textureVelocity.fs";
import textureLifeCycle from "./compute/textureLifeCycle.fs";
import { Plane, Sphere } from "@react-three/drei";

export function ToolBox({ projectName }) {
  ///
  return <>{/*  */}</>;
}

export function Runtime({ io, files, onLoop }) {
  // //
  const refPlane = useRef();
  const refSphere = useRef();

  const mouseNow = useMemo(() => new Vector3(), []);
  const mouseLast = useMemo(() => new Vector3(), []);

  const gl = useThree((r) => r.gl);

  const [countX, setStateX] = useState(2);
  const [countY, setStateY] = useState(2);
  const [countZ, setStateZ] = useState(2);
  //
  const [resX, setResX] = useState(8);
  const [resY, setResY] = useState(8);

  const [ok, setOK] = useState(false);
  //

  useEffect(() => {
    io.in(0, (config) => {
      setResX(config.resX);
      setResY(config.resY);
      //
      setStateX(config.countX);
      setStateY(config.countY);
      setStateZ(config.countZ);
      setOK(true);
    });
  }, [io]);
  //

  const gpu = useMemo(() => {
    let gpu = new GPUComputationRenderer(resX, resY, gl);
    gpu.setDataType(FloatType);
    return gpu;
  }, [resX, resY, gl]);
  //

  const uvInfo = useMemo(() => {
    let uvArray = [];
    let tex = gpu.createTexture();
    let xyz = gpu.createTexture();
    let i = 0;
    for (let y = 0; y < resY; y++) {
      for (let x = 0; x < resX; x++) {
        //
        uvArray.push(x / resX);
        uvArray.push(y / resY);

        tex.image.data[i * 4 + 0] = x / resX;
        tex.image.data[i * 4 + 1] = y / resY;
        tex.image.data[i * 4 + 2] = i / (resX * resY);
        tex.image.data[i * 4 + 3] = 0;
        //
        i++;
      }
    }

    let ii = 0;
    {
      for (let z = 0; z < countZ; z++) {
        for (let y = 0; y < countY; y++) {
          for (let x = 0; x < countX; x++) {
            //
            xyz.image.data[ii * 4 + 0] = x / countX;
            xyz.image.data[ii * 4 + 1] = y / countY;
            xyz.image.data[ii * 4 + 2] = z / countZ;
            xyz.image.data[ii * 4 + 3] = countX * countY * countZ;
            //
            ii++;
          }
        }
      }
    }

    tex.needsUpdate = true;

    return { array: new Float32Array(uvArray), tex, xyz };
  }, [gpu, resY, resX, countZ, countY, countX]);

  const applyUniforms = useCallback(
    ({ material }) => {
      //
      material.uniforms.time = { value: 0.0 };
      material.uniforms.dt = { value: 0.0 };

      material.uniforms.uResolution = { value: new Vector2(resX, resY) };

      material.uniforms.uvTex = { value: uvInfo.tex };
      material.uniforms.xyzTex = { value: uvInfo.xyz };
      //
      material.uniforms.mouseNow = { value: mouseNow };
      material.uniforms.mouseLast = { value: mouseLast };
      return material;
    },
    [resX, resY, uvInfo, mouseNow, mouseLast]
  );

  const varPosition = useMemo(() => {
    let initTexture = gpu.createTexture();

    for (let i = 0; i < countX * countY * countZ; i++) {
      initTexture.image.data[i * 4 + 0] = (Math.random() - 0.5) * 0.1;
      initTexture.image.data[i * 4 + 1] = (Math.random() - 0.5) * 0.1;
      initTexture.image.data[i * 4 + 2] = (Math.random() - 0.5) * 0.1;
      initTexture.image.data[i * 4 + 3] = (Math.random() - 0.5) * 0.1;
    }

    initTexture.needsUpdate = true;

    let variable = gpu.addVariable(
      "texturePosition",
      texturePosition,
      initTexture
    );

    let material = applyUniforms({ material: variable.material });

    return { initTexture, variable, material };
  }, [countX, countY, countZ, gpu, applyUniforms]);

  const varVelocity = useMemo(() => {
    let initTexture = gpu.createTexture();

    for (let i = 0; i < countX * countY * countZ; i++) {
      initTexture.image.data[i * 4 + 0] = (Math.random() - 0.5) * 0.0;
      initTexture.image.data[i * 4 + 1] = (Math.random() - 0.5) * 0.0;
      initTexture.image.data[i * 4 + 2] = (Math.random() - 0.5) * 0.0;
      initTexture.image.data[i * 4 + 3] = 1.0;
    }

    initTexture.needsUpdate = true;

    let variable = gpu.addVariable(
      "textureVelocity",
      textureVelocity,
      initTexture
    );

    let material = applyUniforms({ material: variable.material });

    return { initTexture, variable, material };
  }, [countX, countY, countZ, gpu, applyUniforms]);

  const varLifeCycle = useMemo(() => {
    let initTexture = gpu.createTexture();

    for (let i = 0; i < countX * countY * countZ; i++) {
      initTexture.image.data[i * 4 + 0] = 0.0;
      initTexture.image.data[i * 4 + 1] = 0.0;
      initTexture.image.data[i * 4 + 2] = 0.0;
      initTexture.image.data[i * 4 + 3] = 0.0;
    }

    initTexture.needsUpdate = true;

    let variable = gpu.addVariable(
      "textureLifeCycle",
      textureLifeCycle,
      initTexture
    );

    let material = applyUniforms({ material: variable.material });

    return { initTexture, variable, material };
  }, [countX, countY, countZ, gpu, applyUniforms]);

  useMemo(() => {
    gpu.setVariableDependencies(varPosition.variable, [
      varPosition.variable,
      varVelocity.variable,
      varLifeCycle.variable,
    ]);
    gpu.setVariableDependencies(varVelocity.variable, [
      varPosition.variable,
      varVelocity.variable,
    ]);
    gpu.setVariableDependencies(varLifeCycle.variable, [
      varPosition.variable,
      //
      //
    ]);

    gpu.init();

    //
  }, [gpu, varLifeCycle.variable, varPosition.variable, varVelocity.variable]);

  useFrame((st, dt) => {
    gpu.compute();

    varPosition.material.uniforms.time.value += 0.01;
    varVelocity.material.uniforms.time.value += 0.01;
    varPosition.material.uniforms.dt.value = 0.01;
    varVelocity.material.uniforms.dt.value = 0.01;

    varPosition.material.uniforms.mouseNow.value.copy(mouseNow);
    varVelocity.material.uniforms.mouseNow.value.copy(mouseNow);

    varPosition.material.uniforms.mouseLast.value.copy(mouseLast);
    varVelocity.material.uniforms.mouseLast.value.copy(mouseLast);

    if (st.controls) {
      if (refPlane.current) {
        refPlane.current.position.set(0, 0, 0);
        refPlane.current.lookAt(st.controls.object.position);
      }
    }
  });

  useFrame(() => {
    refSphere.current.position.lerp(mouseNow, 1.0);
  });

  useEffect(() => {
    if (!ok) {
      return;
    }

    io.out(0, {
      gpu,
      uvInfo,
      varPosition,
      varVelocity,
    });
  }, [ok, gpu, varPosition, varVelocity, io, uvInfo]);

  return (
    <>
      <Plane
        visible={false}
        onPointerDown={(ev) => {
          if (ev?.point) {
            //
            mouseLast.copy(mouseNow);
            mouseNow.copy(ev.point);
          }
        }}
        onPointerMove={(ev) => {
          console.log(ev?.point);
          if (ev?.point) {
            //
            mouseLast.copy(mouseNow);
            mouseNow.copy(ev.point);
          }
        }}
        ref={refPlane}
        args={[1000, 1000]}
      ></Plane>
      <Sphere ref={refSphere}></Sphere>
    </>
  );
}

//////

//////

//////

//////
