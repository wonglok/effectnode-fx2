import { Clock, MeshPhysicalMaterial } from "three";
import fragment from "./fragment.fs";
import vertex from "./vertex.vs";

export const Key = `${vertex}-${fragment}`;
export class MyShader extends MeshPhysicalMaterial {
  constructor(pop, { geometry }) {
    super(pop);
    let time = { value: 0 };

    let clock = new Clock();
    this.onBeforeRender = (
      renderer,
      scene,
      camera,
      geometry,
      material,
      group
    ) => {
      time.value += clock.getDelta();
    };

    this.customProgramCacheKey = () => Key;
    this.onBeforeCompile = (shader) => {
      shader.uniforms.time = time;

      shader.uniforms.tx = { value: geometry.tx };
      shader.uniforms.ty = { value: geometry.ty };
      shader.uniforms.tz = { value: geometry.tz };

      shader.vertexShader = vertex;
      shader.fragmentShader = fragment;
    };
  }
}
