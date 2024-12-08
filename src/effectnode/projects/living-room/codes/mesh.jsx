// import { Box, PerspectiveCamera } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import {
  // Environment,
  Gltf,
  PivotControls,
  TransformControls,
  useGLTF,
  // OrbitControls,
  // PerspectiveCamera,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
// import { Clock } from "three";
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

  let gltf = useGLTF(files["/env/interior.glb"]);

  let cloned = clone(gltf.scene);

  useEffect(() => {
    cloned.traverse((it) => {
      if (it.isMesh) {
        it.castShadow = true;
        it.receiveShadow = true;
      }
    });
  }, [cloned]);

  return (
    <>
      {/* <group ref={ref}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry></boxGeometry>
          <meshStandardMaterial color={color}></meshStandardMaterial>
        </mesh>
      </group> */}

      <group
        onClick={(ev) => {
          console.log("clicked", ev.point.toArray(), ev.object.name);
        }}
      >
        <primitive object={cloned}></primitive>
      </group>
    </>
  );
}

//

//

//

//
