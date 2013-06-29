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
	float delta = 0.1;
	vec4 color = texture2D(img, uv + vec2(delta, 0.0));
	color += texture2D(img, uv + vec2(-delta, 0.0));
	color += texture2D(img, uv + vec2(0.0, delta));
	color += texture2D(img, uv + vec2(0.0, -delta));
	color /= 4.0;
	
	color.rgb *= vec3(1.0 - pow(distance(uv, vec2(0.5, 0.5)), 2.1) * 2.8);

	gl_FragColor = vec4(color.rgb, 1.0);
}
