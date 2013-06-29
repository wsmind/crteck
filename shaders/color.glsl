precision highp float;

uniform float time;
uniform vec2 res;
uniform sampler2D img;

// opt: Color of the background
uniform vec3 opt;

//! VERTEX
attribute vec2 p;

void main()
{
	gl_Position = vec4(p, 0.0, 1.0);
}

//! FRAGMENT
void main()
{
	gl_FragColor = vec4(opt, 1.0);
}
