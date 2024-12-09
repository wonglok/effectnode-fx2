#include <common>

uniform vec2 uResolution;
uniform sampler2D uvTex;
uniform sampler2D xyzTex;
uniform float time;



mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, s,
    0.0, -s, c
  );
}


mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

mat3 rotation3dZ(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, s, 0.0,
    -s, c, 0.0,
    0.0, 0.0, 1.0
  );
}


void main (void) {

    //
    vec2 uv = gl_FragCoord.xy / uResolution.xy;


    vec4 uvColor = texture2D(uvTex, uv);
    vec4 xyzColor = texture2D(xyzTex, uv);
    vec4 velColor = texture2D(textureVelocity, uv);
    vec4 posColor = texture2D(texturePosition, uv);

  
    gl_FragColor = vec4(posColor.rgb + velColor.rgb, 1.0);
}