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
float pulse;

float spheres(vec3 pos, float r)
{
  return length(mod(pos, 30.0) - vec3(15.0)) - r;
}

float map(vec3 pos)
{
  return spheres(pos, ((2. + pulse) * 1.5));
}

vec3 traceRay(vec3 pos, vec3 dir)
{
   for (int i = 0; i < 30; i++)
   {
       float distance = map(pos);
       pos += distance * dir;
   }
  
   return pos;
}

vec3 calcNormal(vec3 pos)
{
    float eps = 0.01;
  
    return normalize(vec3(
    map(vec3(pos.x + eps, pos.y, pos.z)) - map(vec3(pos.x - eps, pos.y, pos.z)),
      map(vec3(pos.x, pos.y + eps, pos.z)) - map(vec3(pos.x, pos.y - eps, pos.z)),
      map(vec3(pos.x, pos.y, pos.z + eps)) - map(vec3(pos.x, pos.y, pos.z - eps))
  ));
}

void main(void)
{
  vec2 uv = gl_FragCoord.xy / res.xy;
	pulse = exp(.4-fract(time + .1)) + exp(.4-fract((time + .6))) * 0.4;
  
  vec3 pos = vec3(time * 50., sin(time) * 20., 0.);
  vec3 dir = normalize(vec3(
    (gl_FragCoord.x - res.x * 0.5) / res.y, gl_FragCoord.y / res.y - 0.5,
    sin(time * 1.57) * 0.4 + 1.2));
  
  vec3 color = vec3(.9, .4, 0.0);
    vec3 point = traceRay(pos, dir);
    vec3 normal = calcNormal(point);
  
  float fogFactor = 1.0 - (1.0 / exp(abs(point.z) * 0.01));
    float diffuse = max(dot(normal, normalize(vec3(1.0))), 0.0) * 2.0 + pulse * 0.4;
  
    color = mix(color * diffuse, vec3(1., 0.95, 0.8), fogFactor);
  
  gl_FragColor = vec4(color,1.0);
}
