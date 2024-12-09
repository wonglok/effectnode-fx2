#include <common>
varying float brightness;
uniform float time;
varying vec3 vDistribution;

varying vec2 vTUV;
uniform sampler2D varPosition;
uniform sampler2D varVelocity;

void main(void){
    vec4 dataPosition = texture2D(varPosition, vTUV);
    vec4 dataVelocity = texture2D(varVelocity, vTUV);
    
    
    gl_FragColor = vec4(1.0);

    gl_FragColor.rgb = vec3(brightness) * vec3(normalize(dataVelocity.rgb) * 0.5 + 0.5);
}

// 

//

//