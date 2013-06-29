precision highp float;

uniform float time;
uniform vec2 res;
uniform sampler2D img;

// opt: Snow density, from 0 (nothing) to 1 (snowy) to even 2 (stormy)!
uniform float opt;

// opt2: Snow color, from 0 (black) to 1 (white)
uniform float opt2;

//! VERTEX
attribute vec2 p;

void main()
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT

// Old TV noise with vertical bars

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void)
{
	vec2 uv = gl_FragCoord.xy / res;
	float screenRatio = res.x / res.y;
	
	vec3 texture = texture2D(img, uv).rgb;
	
	float barHeight = 6.;
	float barSpeed = 5.6;
	float barOverflow = 1.2;
	float blurBar = clamp(sin(uv.y * barHeight + time * barSpeed) + 1.25, 0., 1.);
	float bar = clamp(floor(sin(uv.y * barHeight + time * barSpeed) + 1.95), 0., barOverflow);
	
	float pixelDensity = 250.;
	vec3 color = vec3(clamp(rand(
		vec2(floor(uv.x * pixelDensity * screenRatio), floor(uv.y * pixelDensity)) *
		time / 1000.
	) + 1. - opt, 0., 1.));
	
	color = mix(color - vec3(.25) * opt, color, blurBar);
	color = mix(color - vec3(.08) * opt, color, bar);
	color = mix(vec3(opt2), texture, color);
	color.b += .042;
	
	color *= vec3(1.0 - pow(distance(uv, vec2(0.5, 0.5)), 2.1) * 2.8);
	
	gl_FragColor = vec4(color, 1.);
}
