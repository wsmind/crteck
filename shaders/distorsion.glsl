precision highp float;

uniform float time;
uniform vec2 res;
uniform sampler2D img;
uniform float opt;

//! VERTEX
attribute vec2 p;

void main()
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT
float rand(vec2 co, float seed){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233) + seed)) * 43758.5453);
}

void main()
{
	vec2 uv = gl_FragCoord.xy / res.xy;
	vec3 color = texture2D(img, uv + vec2(opt * sin(uv.y * (cos(time) * 5.0 + 10.0)), 0.0) * sin(time) * 0.2).rgb;
	vec3 r = vec3(rand(uv, time)) * 2.0;
	color *= r;
	color += r * 0.2;
	color.r *= sin(uv.y * 8.0 + time) * 0.4 + 0.8;
	color.gb *= sin(uv.y * 7.5 + time) * 0.4 + 0.8;
	color = mix(color, vec3(0.5), 0.3);
	
	color.rgb *= vec3(1.0 - pow(distance(uv, vec2(0.5, 0.5)), 2.1) * 2.8);
	
	gl_FragColor = vec4(color, 1.0);
}
