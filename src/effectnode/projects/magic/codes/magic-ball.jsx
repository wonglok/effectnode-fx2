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
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  StaticReadUsage,
} from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export function ToolBox({ projectName }) {
  ///
  return <>{/*  */}</>;
}

export function Runtime({ io, files, onLoop }) {
  let count = useMemo(() => {
    return 300;
  }, []);

  let baseGeometry = useMemo(() => {
    return new BoxGeometry(0.1, 0.1, 0.1).toNonIndexed();
  }, []);

  let offsets = useMemo(() => {
    let offsets = [];

    for (let i = 0; i < count; i++) {
      offsets.push(Math.random() * 5 - 2.5);
      offsets.push(Math.random() * 5 - 2.5);
      offsets.push(Math.random() * 5 - 2.5);
    }

    return offsets;
  }, [count]);

  let vertexShader = `
    attribute vec3 offsets;
    void main(void){
      vec3 pos = position + offsets;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }
  `;

  let fragmentShader = `
    void main(void){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  `;

  let shader = useMemo(() => {
    let shader = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {},
    });

    return shader;
  }, [vertexShader, fragmentShader]);

  let geometry = useMemo(() => {
    let geometry = new InstancedBufferGeometry();
    geometry.copy(baseGeometry);

    geometry.setAttribute(
      "offsets",
      new InstancedBufferAttribute(new Float32Array(offsets), 3)
    );

    geometry.instanceCount = count;

    return geometry;
  }, [baseGeometry, offsets, count]);

  let mesh = useMemo(() => {
    return <primitive object={new Mesh(geometry, shader)}></primitive>;
  }, [geometry, shader]);

  return <>{mesh}</>;
}
