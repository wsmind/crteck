precision highp float;

uniform float time;
uniform vec2 res;

//! VERTEX
attribute vec2 p;

void main(void)
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT
const float fogDensity = 0.004;

float plane(vec3 pos, vec4 eq)
{
  return dot(eq, vec4(pos, 1.0)) - sin(pos.x * 0.5 + time * 2.0) * sin(pos.z * 0.2 + time)
  	// First beat
  	* exp(.5 -fract(time + .25) * .5)
  	// Second beat
  	* exp(.5 -fract(time + .1) * 1.);
}

float map(vec3 pos)
{
	float f = sin(time * 0.1) * 0.005;
	float c = cos(pos.z * f);
	float s = sin(pos.z * f);
	mat2 rotation = mat2(c, -s, s, c);
	pos.xy = rotation * pos.xy;
	
	return plane(pos, vec4(0.0, 1.0, 0.0, 0.0));
}

vec3 calcNormal(vec3 pos)
{
    float eps = 0.01;
    vec3 nor;
    nor.x = map( vec3(pos.x+eps, pos.y, pos.z)) - map( vec3(pos.x-eps, pos.y, pos.z));
    nor.y = map( vec3(pos.x, pos.y+eps, pos.z)) - map( vec3(pos.x, pos.y-eps, pos.z));
    nor.z = map( vec3(pos.x, pos.y, pos.z+eps)) - map( vec3(pos.x, pos.y, pos.z-eps));
    return normalize( nor );
}

float calcOcclusion(vec3 pos, vec3 normal, float occlusionScale)
{
   float distance = occlusionScale;
   pos += normal * occlusionScale;
   for (int i = 0; i < 5; i++)
   {
      pos += normal;
      distance = min(distance, max(map(pos), 0.0));
   }
   return distance / occlusionScale;
}

vec3 traceRay(vec3 pos, vec3 dir)
{
   for (int i = 0; i < 40; i++)
   {
       float distance = map(pos);
       pos += 0.9 * distance * dir;
   }
   return pos;
}

void main(void)
{
	vec3 pos = vec3(cos(time * 0.7) * 5.0, sin(time * 0.4) * 10.0 + 12.0, 0.0);
	vec3 dir = normalize(vec3((gl_FragCoord.x - res.x * 0.5) / res.y, gl_FragCoord.y / res.y - 0.5, 1.0));
	
	vec3 outColor;
	vec3 point = traceRay(pos, dir);
	vec3 normal = calcNormal(point);
	vec3 color = vec3(1.0, 1.0, 1.0);
	float fogFactor = 1.0 - (1.0 / exp(point.z * fogDensity));
	float occlusion = calcOcclusion(point, normal, 5.0);
	float diffuse = max(dot(normal, vec3(0.707, 0.707, 0.0)), 0.0);
	outColor = mix(color * diffuse * occlusion, vec3(0.8, 0.8, 0.8), fogFactor);
	
	gl_FragColor = vec4(outColor, 1.0);
}
