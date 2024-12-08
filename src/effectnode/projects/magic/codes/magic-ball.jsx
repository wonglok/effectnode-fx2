// import { Box, PerspectiveCamera } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import {
  Box,
  // Environment,
  Gltf,
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
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  StaticReadUsage,
} from "three";
// import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import fragmentShader from "./shader/ball.fs";
import vertexShader from "./shader/ball.vs";
import { useFrame } from "@react-three/fiber";

export function ToolBox({ projectName }) {
  ///
  return <>{/*  */}</>;
}

export function Runtime({ io, files, onLoop }) {
  const [countX, setStateX] = useState(1024);
  const [countY, setStateY] = useState(1024);

  useEffect(() => {
    // return io.in0(() => {});
  }, [io]);

  let count = useMemo(() => {
    return countX * countY;
  }, [countX, countY]);

  let baseGeometry = useMemo(() => {
    //
    let box = new ConeGeometry(0.005, 0.005, 3, 1);

    return box.toNonIndexed();
  }, []);

  //

  let geometryBase = useMemo(() => {
    let geometry = new InstancedBufferGeometry();
    geometry.copy(baseGeometry);
    geometry.instanceCount = count;

    return geometry;
  }, [baseGeometry, count]);

  let geometry = useMemo(() => {
    let offsets = [];
    let rot = [];
    let puv = [];
    let idx = [];

    let ii = 0;
    for (let i = 0; i < countY; i++) {
      for (let j = 0; j < countX; j++) {
        puv.push(j / countX, i / countY);

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
  }, [geometryBase, countX, countY]);

  let shader = useMemo(() => {
    let shader = new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      uniforms: {
        time: { value: 0 },
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

  let mesh = useMemo(() => {
    return <primitive object={new Mesh(geometry, shader)}></primitive>;
  }, [geometry, shader]);

  return <>{mesh}</>;
}
