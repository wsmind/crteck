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
	gl_FragColor = vec4(1.0);
}
