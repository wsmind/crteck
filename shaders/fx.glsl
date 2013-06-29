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
/*void main()
{
	vec2 uv = gl_FragCoord.xy / res;
	vec3 plop = texture2D(img, uv).rgb;
	float factor = (sin(uv.y * 300.0) + 0.4) * (3.0 + (time));
	vec3 color = mix(plop, vec3(0.0), factor);
	
	gl_FragColor = vec4(color * plop, 1.0);
}*/

/*void main()
{
	vec2 uv = gl_FragCoord.xy / res;
	vec3 image_derriere = texture2D(img, uv).rgb;
	
	float factor = 1.0 - distance(uv, vec2(0.5, 0.5)) * exp(0.15);
	
	vec3 color = mix(vec3(0.0), image_derriere, factor);
	gl_FragColor = vec4(color,1.0);
}*/

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{
	vec2 uv = gl_FragCoord.xy / res;
	vec3 color = texture2D(img, uv).rgb;
	
	gl_FragColor = vec4(color, 1.0);
}
