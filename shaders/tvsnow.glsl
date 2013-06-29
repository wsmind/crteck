// Old TV noise with vertical bars

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void)
{
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	float screenRatio = iResolution.x / iResolution.y;
	
	vec3 texture = texture2D(iChannel0, uv).rgb;
	
	float barHeight = 6.;
	float barSpeed = 5.6;
	float barOverflow = 1.2;
	float blurBar = clamp(sin(uv.y * barHeight + iGlobalTime * barSpeed) + 1.25, 0., 1.);
	float bar = clamp(floor(sin(uv.y * barHeight + iGlobalTime * barSpeed) + 1.95), 0., barOverflow);
	
	float noiseIntensity = +0.3;
	float pixelDensity = 200.;
	vec3 color = vec3(clamp(rand(
		vec2(floor(uv.x * pixelDensity * screenRatio), floor(uv.y * pixelDensity)) *
		iGlobalTime / 1000.
	) + noiseIntensity, 0., 1.));
	
	color = mix(color - vec3(.25), color, blurBar);
	color = mix(color - vec3(.08), color, bar);
	color = mix(vec3(0.), texture, color);
	color.b += .042;
	
	gl_FragColor = vec4(color, 1.);
}
