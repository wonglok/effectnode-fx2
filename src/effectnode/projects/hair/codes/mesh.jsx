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
import { useEffect, useRef, useState } from "react";
import { Clock } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export function ToolBox({ projectName }) {
  ///
  return <>{/*  */}</>;
}

export function Runtime({ io, files, onLoop }) {
  // let ref = useRef();

  // useEffect(() => {
  //   let clock = new Clock();
  //   return onLoop(() => {
  //     let dt = clock.getDelta();

  //     if (ref.current) {
  //       ref.current.rotation.y += dt * 1.0;
  //     }
  //   });
  // }, [onLoop]);

  // let [color, setColor] = useState("#ffffff");

  // useEffect(() => {
  //   io.in(0, (color) => {
  //     setColor(color);
  //   });
  // }, [io]);

  return (
    <>
      <Box></Box>
    </>
  );
}

//

//

//

//
