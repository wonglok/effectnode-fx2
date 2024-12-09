#include <common>

uniform vec2 uResolution;
uniform sampler2D uvTex;
uniform sampler2D xyzTex;
uniform float time;

void main (void) {

    //
    vec2 uv = gl_FragCoord.xy / uResolution.xy;


    vec4 uvColor = texture2D(uvTex, uv);
    vec4 xyzColor = texture2D(xyzTex, uv);
    vec4 velColor = texture2D(textureVelocity, uv);
    vec4 posColor = texture2D(texturePosition, uv);


    gl_FragColor = vec4(posColor.rgb + velColor.rgb, 1.0);
}