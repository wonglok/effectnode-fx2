#include <common>

uniform vec2 uResolution;
uniform sampler2D uvTex;
uniform sampler2D xyzTex;
uniform float time;
uniform float dt;

void main (void) {

    //
    vec2 uv = gl_FragCoord.xy / uResolution.xy;


    vec4 uvColor = texture2D(uvTex, uv);
    vec4 xyzColor = texture2D(xyzTex, uv);

    vec4 posColor = texture2D(texturePosition, uv);
    vec4 velColor = texture2D(textureVelocity, uv);

    vec3 center = vec3(0.0, 0.0, 0.0);

    vec3 dir = normalize(center - posColor.rgb);

    velColor.rgb += dir * dt * 0.1;

    gl_FragColor = vec4(velColor.rgb, 1.0);
}