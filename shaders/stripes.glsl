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
	vec2 uv = gl_FragCoord.xy / res;
	vec3 image = texture2D(img, uv).rgb;
	float factor = (sin((uv.y + (sin(time) / 2.0)) * 500.0) - 0.5) * 3.0;
	vec3 band_color = mix(image, vec3(0.), .2);
	vec3 color = mix(image, band_color, factor);

	color *= vec3(1.0 - pow(distance(uv, vec2(0.5, 0.5)), 2.1) * 2.8);

	gl_FragColor = vec4(color * image, 1.0);
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
