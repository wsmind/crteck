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
const float infinity = 10000.0;
const vec3 skyColor = vec3(0.7, 0.9, 1.0);
const float fogDensity = 0.004;
const vec3 lightColor = vec3(0.5, 1.0, 0.9);

// inspired from WebGL path tracing demo
float random(float seed)
{
  return fract(sin(dot(gl_FragCoord.xyz * 0.01 + seed, vec3(3.9898, 7.233, 11.7182))) * 43758.5453 + seed);
}

vec3 randomVec3(float seed)
{
  return vec3(random(seed), random(seed + 0.15), random(seed - 0.87));
}

float plane(vec3 pos, vec4 eq)
{
  return dot(eq, vec4(pos, 1.0)) - sin(pos.x * 0.5 + time * 2.0) * sin(pos.z * 0.2 + time) * exp(-fract(time)) * 10.0;
}

float spheres(vec3 pos, float r)
{
  return length(mod(pos, 20.0) - vec3(10.0, 10.0, 10.0)) - r;
}

float cube(vec3 pos)
{
	return length(max(abs(pos) - vec3(10.0, 10.0, 10.0), 0.0));
}

float map(vec3 pos)
{
	float f = sin(time * 0.1) * 0.004;
	float c = cos(pos.z * f);
	float s = sin(pos.z * f);
	mat2 rotation = mat2(c, -s, s, c);
	pos.xy = rotation * pos.xy;
	
	//return min(plane(pos, vec4(0.0, 1.0, 0.0, 0.0)), spheres(pos, (sin(time) * sin(time)) * 5.0 + 2.0));
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

vec3 calcColor(vec3 pos)
{
	vec3 q = floor(mod(pos * 0.4, 2.0)) * 2.0 - 1.0;
	float checker = q.x * q.y * q.z;
   float f1 = mod(pos.x, 10.0) > 5.0 ? 1.0 : -1.0;
   float f2 = mod(pos.z, 10.0) > 5.0 ? 1.0 : -1.0;
   //float checker = f1 * f2;
   return vec3(checker, checker, 1.0);
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
   //vec3 pos = vec3(mouse.x - res.x * 0.5, mouse.y - res.y * 0.5, 0.0) * 0.1;
   vec3 pos = vec3(cos(time * 0.7) * 5.0, sin(time * 0.4) * 10.0 + 12.0, 0.0);
   vec3 dir = normalize(vec3((gl_FragCoord.x - res.x * 0.5) / res.y, gl_FragCoord.y / res.y - 0.5, 1.0));

   vec3 outColor;
   vec3 point = traceRay(pos, dir);
   vec3 normal = calcNormal(point);
   //vec3 reflectPoint = traceRay(point, reflect(normal, dir));
   vec3 color = vec3(1.0, 1.0, 1.0); //calcColor(point);
   //vec3 reflectColor = calcColor(reflectPoint);
   float fogFactor = 1.0 - (1.0 / exp(point.z * fogDensity));
   //float reflectFogFactor = 1.0 - (1.0 / exp(length(reflectPoint - point) * fogDensity));
   float occlusion = calcOcclusion(point, normal, 5.0);
   float diffuse = max(dot(normal, vec3(0.707, 0.707, 0.0)), 0.0);
   //outColor = mix(color * diffuse * occlusion + mix(reflectColor, skyColor, reflectFogFactor) * 0.2, skyColor, fogFactor);
   //outColor = mix(color * diffuse * occlusion + skyColor * reflectFogFactor * 0.3, skyColor, fogFactor);
   //rainbow(gl_FragCoord.y / res.y + sin(time + gl_FragCoord.x * 10.0 / res.x) * 0.1)
   outColor = mix(color * diffuse * occlusion, vec3(0.8, 0.8, 0.8), fogFactor);
//   outColor = vec3(occlusion, 0.0, 0.0);
	
   gl_FragColor = vec4(outColor, 1.0);
   //gl_FragColor = vec4(randomVec3(time * 0.01), 1.0);
}
