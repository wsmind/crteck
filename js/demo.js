function startDemo()
{
	//Math.seedrandom("plop")
	
	// load sound
	var songGen = new sonant()
	for (var t = 0; t < 8; t++)
		songGen.generate(t)
	audio = songGen.createAudio()
	//audio = new Audio()
	audio.volume = 0
	bpm = 128
	
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
	shaderNotStraight = new ShaderProgram(backgroundVertexShader, notstraightFragmentShader)
	
	// post-effects
	fxStripes = new ShaderProgram(backgroundVertexShader, stripesFragmentShader)
	fxBlur = new ShaderProgram(backgroundVertexShader, blurFragmentShader)
	fxChroma = new ShaderProgram(backgroundVertexShader, chromaFragmentShader)
	fxTvSnow = new ShaderProgram(backgroundVertexShader, tvsnowFragmentShader)
	
	timeline = [
		{
			s: 0,
			e: 8,
			sh: testShader,
			fx: fxStripes
		},
		{
			s: 8,
			e: 9,
			sh: testShader2,
			fx: fxBlur
		},
		{
			s: 9,
			e: 10,
			sh: testShader,
			fx: fxChroma
		},
		{
			s: 10,
			e: 16,
			sh: shaderNotStraight,
			fx: fxStripes
		},
		{
			s: 16,
			e: 32,
			sh: testShader,
			fx: fxTvSnow
		},
		{
			s: 32,
			e: 48,
			sh: shaderNotStraight,
			fx: fxChroma
		}
	]
}

function updateDemo()
{
	var demoTime = audio.currentTime * bpm / 120.0
	
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
