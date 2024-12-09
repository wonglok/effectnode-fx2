#include <common>
varying float brightness;
uniform float time;
varying vec3 vDistribution;

varying vec2 vTUV;
uniform sampler2D varPosition;
uniform sampler2D varVelocity;



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


void main(void){
    vec4 dataPosition = texture2D(varPosition, vTUV);
    vec4 dataVelocity = texture2D(varVelocity, vTUV);
    
    gl_FragColor = vec4(1.0);

    gl_FragColor.rgb = vec3(brightness) * vec3(vec3(0.0, 1.0, 0.0) * rotation3dX(dataPosition.x) * rotation3dY(dataPosition.y) * rotation3dZ(dataPosition.z) * 0.5 + 0.5);
}

// 

//

//