import { Uniform } from "three";
import { Effect, EffectAttribute, BlendFunction } from "postprocessing";
import { wrapEffect } from "../util.js";
const WaterShader = {
  fragmentShader: `
  uniform float factor;
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 vUv = uv;
    float frequency = 6.0 * factor;
    float amplitude = 0.015 * factor;
    float x = vUv.y * frequency + time * .7; 
    float y = vUv.x * frequency + time * .3;
    vUv.x += cos(x+y) * amplitude * cos(y);
    vUv.y += sin(x-y) * amplitude * cos(y);
    vec4 rgba = texture2D(inputBuffer, vUv);
    outputColor = rgba;
  }`
};
class WaterEffectImpl extends Effect {
  constructor({ blendFunction = BlendFunction.NORMAL, factor = 0 } = {}) {
    super("WaterEffect", WaterShader.fragmentShader, {
      blendFunction,
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: /* @__PURE__ */ new Map([["factor", new Uniform(factor)]])
    });
  }
}
const WaterEffect = wrapEffect(WaterEffectImpl, { blendFunction: BlendFunction.NORMAL });
export {
  WaterEffect,
  WaterEffectImpl
};
//# sourceMappingURL=Water.js.map
