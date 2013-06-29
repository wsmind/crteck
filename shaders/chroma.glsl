precision highp float;

uniform float time;
uniform vec2 res;
uniform sampler2D img;

//! VERTEX
attribute vec2 p;

void main()
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT
void main()
{
	float t = floor(fract(time * 4.0) * 2.0);
	vec2 uv = gl_FragCoord.xy / res;
	vec2 diff = vec2(sin(uv.y * 10.0 + time) * 0.02, 0.0);
	uv += diff * t;
	vec3 color = texture2D(img, uv).rgb;
	
	uv += diff * t;
	color.r = texture2D(img, uv).r;
	
	color *= vec3(1.0 - pow(distance(uv, vec2(0.5, 0.5)), 2.1) * 2.8);
	
	gl_FragColor = vec4(color, 1.0);
}
