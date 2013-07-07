precision highp float;

uniform float time;
uniform vec2 res;
uniform sampler2D img;

// opt[0]: Time
uniform vec3 opt;

//! VERTEX
attribute vec2 p;

void main()
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT

// Horizontal lines transforming into blurry and colorful vertical lines

void main(void)
{
	float PI = 3.14159265358;
	vec2 uv = gl_FragCoord.xy / res;
	float screenRatio = res.x / res.y;
	
	vec3 color = vec3(
		cos(uv.x * 10. * PI * screenRatio) +
		cos(uv.y * 10. * PI) * abs(tan(opt[0])));
	
	color.r += uv.x;
	color.g += uv.y;
	color.b += 1. - uv.y;
	
	gl_FragColor = vec4(color, 1.0);
}
