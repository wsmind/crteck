function setupCanvas()
{
	// remove packing garbage
	document.body.innerHTML = ""
	
	// create global canvas
	canvas = document.createElement("canvas")
	document.body.appendChild(canvas)
	
	// remove all margins
	document.body.style.margin = 0
	document.body.style.overflow = "hidden"
	canvas.border = 0
	canvas.style.padding = 0
	canvas.style.margin = 0
	
	// context
	gl = canvas.getContext("experimental-webgl")
	
	// allow resizing
	window.onresize = resize
	
	// apply current window size
	resize()
}

function setupText()
{
	text = document.createElement("span")
	document.body.appendChild(text)

	text.style.position = 'fixed'
	text.style.top = '70%'
	text.style.left = '70%'
	text.style.fontSize = '50px'
	text.style.color = 'white'
	text.style.textShadow = '1px 1px #aaaaaa'
	text.style.fontFamily = 'arial'
	text.style.fontWeight = 'bold'
	text.id = 's'
}

function resize()
{
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	gl.viewport(0, 0, canvas.width, canvas.height)
}

function update()
{
	updateDemo()
	requestAnimFrame(update)
}

function main()
{
	setupCanvas()
	setupText()
	
	startDemo()
	
	// start main loop
	requestAnimFrame(update)
}

/**
 * Provides requestAnimationFrame in a cross browser way.
 * This function has been directly taken from https://cvs.khronos.org/svn/repos/registry/trunk/public/webgl/sdk/demos/common/webgl-utils.js
 */
var requestAnimFrame = (function() {
  return window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame
})();

// start demo!
main()
