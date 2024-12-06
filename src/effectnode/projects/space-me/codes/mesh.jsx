// import { Box, PerspectiveCamera } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { EffectNode } from "effectnode-developer-tools/effectnode-runtime/EffectNode";
import { useEffect, useRef, useState } from "react";
import { Clock } from "three";

export function ToolBox({ projectName }) {
  ///
  return (
    <>
      <Canvas>
        <EffectNode projectName={projectName}></EffectNode>
      </Canvas>
    </>
  );
}

export function Runtime({ io, onLoop }) {
  let ref = useRef();

  useEffect(() => {
    let clock = new Clock();
    return onLoop(() => {
      let dt = clock.getDelta();

      if (ref.current) {
        ref.current.rotation.y += dt * 1.0;
      }
    });
  }, [onLoop]);

  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    io.in(0, (color) => {
      console.log(color);
      setColor(color);
    });
  }, [io]);

  return (
    <>
      <group ref={ref}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry></boxGeometry>
          <meshStandardMaterial color={color}></meshStandardMaterial>
        </mesh>
      </group>
    </>
  );
}

//

//

//
