function startDemo()
{
	//Math.seedrandom("plop")
	
	// load sound
	var songGen = new sonant()
	for (var t = 0; t < 1; t++)
		songGen.generate(t)
	audio = songGen.createAudio()
	audio.volume = 0
	bpm = 128
	
	// wait to have the actual audio duration (not NaN)
	beatDuration = audio.duration * bpm / 60.0
	audio.play()
	
	// fullscreen quad
	var points = [-1, -1, -1, 1, 1, -1, 1, 1]
	quad = new VertexBuffer(2, gl.FLOAT, new Float32Array(points))
	
	// RTT target
	renderTarget = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, renderTarget)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
	fbo = gl.createFramebuffer()
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, renderTarget, 0)
	
	// shaders
	testShader = new ShaderProgram(backgroundVertexShader, backgroundFragmentShader)
	testShader2 = new ShaderProgram(backgroundVertexShader, terrainFragmentShader)
	
	// post-effects
	testFx = new ShaderProgram(backgroundVertexShader, fxFragmentShader)
	
	timeline = [
		{
			s: 0,
			e: 8,
			sh: testShader,
			fx: testFx
		},
		{
			s: 8,
			e: 9,
			sh: testShader2,
			fx: testFx
		},
		{
			s: 9,
			e: 10,
			sh: testShader,
			fx: testFx
		},
		{
			s: 10,
			e: 16,
			sh: testShader2,
			fx: testFx
		},
		{
			s: 16,
			e: 32,
			sh: testShader,
			fx: testFx
		},
		{
			s: 32,
			e: 48,
			sh: testShader2,
			fx: testFx
		}
	]
}

function updateDemo()
{
	var demoTime = audio.currentTime * bpm / 60.0
	
	for (var i = 0; i < timeline.length; i++)
	{
		var scene = timeline[i]
		if ((demoTime >= scene.s) && (demoTime < scene.e))
		{
			// main pass
			gl.bindTexture(gl.TEXTURE_2D, null)
			gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
			
			var shader = scene.sh
			var fx = scene.fx
			
			shader.bind()
			shader.setFloatUniform("time", demoTime)
			shader.setVec2Uniform("res", [canvas.width, canvas.height])
			
			var posAttribute = shader.getAttributeLocation("p")
			quad.bind(posAttribute)
			
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
			
			// post-effect pass
			gl.bindTexture(gl.TEXTURE_2D, renderTarget)
			gl.bindFramebuffer(gl.FRAMEBUFFER, null)
			
			fx.bind()
			fx.setFloatUniform("time", demoTime)
			fx.setVec2Uniform("res", [canvas.width, canvas.height])
			fx.setSamplerUniform("img", 0)
			
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
		}
	}
}
