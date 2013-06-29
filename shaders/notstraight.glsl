// Horizontal lines transforming into blurry and colorful vertical lines

void main(void)
{
	float PI = 3.14159265358;
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	float screenRatio = iResolution.x / iResolution.y;
	
	vec3 color = vec3(
		cos(uv.x * 10. * PI * screenRatio) +
		cos(uv.y * 10. * PI) * abs(tan(iGlobalTime)));
	
	color.r += uv.x;
	color.g += uv.y;
	color.b += 1. - uv.y;
	
	gl_FragColor = vec4(color, 1.0);
}
