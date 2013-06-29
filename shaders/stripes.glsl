precision highp float;

uniform float time;
uniform vec2 res;
uniform sampler2D img;
uniform float opt;
uniform float opt2;

//! VERTEX
attribute vec2 p;

void main()
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 applySnow(vec3 tex, vec2 uv)
{
	float barHeight = 6.;
	float barSpeed = 5.6;
	float barOverflow = 1.2;
	float blurBar = clamp(sin(uv.y * barHeight + time * barSpeed) + 1.25, 0., 1.);
	float bar = clamp(floor(sin(uv.y * barHeight + time * barSpeed) + 1.95), 0., barOverflow);
	
	float pixelDensity = 250.;
	vec3 color = vec3(clamp(rand(
		vec2(floor(uv.x * pixelDensity * res.x / res.y), floor(uv.y * pixelDensity)) *
		time / 1000.
	) + 1. - opt, 0., 1.));
	
	color = mix(color - vec3(.25) * opt, color, blurBar);
	color = mix(color - vec3(.08) * opt, color, bar);
	color = mix(vec3(opt2), tex, color);
	color.b += .042;
	
	return color;
}

void main()
{
	vec2 uv = gl_FragCoord.xy / res;
	vec3 image = texture2D(img, uv).rgb;
	float factor = (sin((uv.y + (sin(time) / 2.0)) * 500.0) - 0.5) * 3.0;
	vec3 band_color = mix(image, vec3(0.), .2);
	vec3 color = mix(image, band_color, factor);
	color = applySnow(color * image, uv);
	
	color *= vec3(1.0 - pow(distance(uv, vec2(0.5, 0.5)), 2.1) * 2.8);

	gl_FragColor = vec4(color, 1.0);
}
