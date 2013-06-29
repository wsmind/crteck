precision highp float;

uniform float time;
uniform vec2 res;
uniform sampler2D img;

// opt: Animation speed
uniform float opt;

//! VERTEX
attribute vec2 p;

void main()
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT

float antiVignette(vec2 pos)
{
	return sqrt(abs(pos.x - .5)) + sqrt(abs(pos.y - .5));
}

void main(void)
{
	vec2 uv = gl_FragCoord.xy / res.xy;
	vec3 texture = texture2D(img, uv).rgb;
	
	float dBlack = 2. - abs(sin(1. - time * 2.)) * 2.;
	float dWhite = dBlack * .95;
	
	vec3 black = mix(vec3(1.), vec3(0.), clamp(floor(antiVignette(uv) / dBlack), .0, 1.));
	vec3 white = mix(vec3(1.), vec3(0.), clamp(floor(antiVignette(uv) / dWhite), .0, 1.));
	
	vec3 color = mix(vec3(.8), texture, white);
	color = mix(vec3(0.), color, black);
	
	gl_FragColor = vec4(color, 1.0);
}
