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
	
	// window title
	window.title = "CRTeCK"
	
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
	gl.bindFramebuffer(gl.FRAMEBUFFER, null)
	gl.viewport(0, 0, canvas.width, canvas.height)
	
	if (window.renderTarget !== undefined)
	{
		// resize render target
		gl.bindTexture(gl.TEXTURE_2D, renderTarget)
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
		
		gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
		gl.viewport(0, 0, canvas.width, canvas.height)
	}
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
