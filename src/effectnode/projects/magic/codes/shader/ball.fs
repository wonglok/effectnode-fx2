#include <common>
varying float ra;
uniform float time;
varying vec3 vDistribution;

void main(void){
    
    gl_FragColor = vec4(ra,ra,ra,1.0);

    gl_FragColor.rgb *= vec3(normalize(vDistribution) * 0.5 + 0.5);
}

// 

//

//