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
  BufferAttribute,
  BufferGeometry,
  Clock,
  InstancedBufferGeometry,
} from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { Key, MyShader } from "../Lib/MyShader";

export function ToolBox({ projectName }) {
  ///
  return <>{/*  */}</>;
}

export function Runtime({ io, files, onLoop }) {
  let geometry = useMemo(() => {
    let bufferGeo = new BufferGeometry();

    let schema = [];
    let xy = [];
    let position = [];
    let normals = [];
    let ty = 100;
    let tx = 100;
    let tz = 100;

    let scale = 0.5;

    let lineIDs = [];
    let lineIDX = 0;

    let terminals = [];
    //

    for (let tzi = 0; tzi < tz; tzi++) {
      for (let txi = 0; txi < tx; txi++) {
        //
        for (let tyi = 0; tyi < ty; tyi++) {
          //

          let x = txi;
          let y = tyi;
          let z = tzi;

          schema.push(x, y, z);
          schema.push(x, y, z);

          xy.push(x, z);
          xy.push(x, z);

          position.push(0, 0, 0);
          position.push(0, 0, 0);

          terminals.push(0);
          terminals.push(1);

          lineIDs.push(lineIDX);
          lineIDs.push(lineIDX);

          normals.push(0, 1, 0);
          normals.push(0, 1, 0);
        }

        lineIDX++;
      }
    }

    bufferGeo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );

    bufferGeo.setAttribute(
      "xy",
      //
      new BufferAttribute(new Float32Array(xy), 2)
    );

    bufferGeo.setAttribute(
      "schema",
      new BufferAttribute(new Float32Array(schema), 3)
    );

    bufferGeo.setAttribute(
      "terminal",
      new BufferAttribute(new Float32Array(terminals), 1)
    );

    bufferGeo.setAttribute(
      "normal",
      new BufferAttribute(new Float32Array(normals), 3)
    );
    //

    //

    bufferGeo.tx = tx;
    bufferGeo.ty = ty;
    bufferGeo.tz = tz;
    return bufferGeo;
  }, []);

  let shader = useMemo(() => {
    return new MyShader({}, { geometry: geometry });
  }, [geometry]);

  return (
    <>
      <lineSegments material={shader} geometry={geometry}></lineSegments>
    </>
  );
}

//

//

//

//
