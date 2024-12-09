#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 schema;
attribute float terminal;
attribute vec2 xy;

uniform float time;

uniform float tx;
uniform float ty;
uniform float tz;

varying vec3 vTransformed;

void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
    
    float scale = 1.5;

    transformed = vec3(0.0);

    float yTrans = ((schema.y + terminal) / ty);

    float swingX = 1.0 * cos(yTrans + time) * schema.y / ty * scale;
    float swingZ = 1.0 * sin(yTrans + time) * schema.y / ty * scale;

    transformed.x = (schema.x / tx - 0.5) * scale + swingX;
    transformed.y = ((schema.y + terminal) / ty);
    transformed.z = (schema.z / tz - 0.5) * scale + swingZ;


    vTransformed = transformed;
    vTransformed.y = schema.y / ty;
    //

    #include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}