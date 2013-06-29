function startDemo()
{
	//Math.seedrandom("plop")
	
	// load sound
	var player = new CPlayer()
	player.init(song)
	while (!player.generate().done);
	var wave = player.createWave()
	var uri = "data:audio/wav;base64," + btoa(wave)
	audio = new Audio()
	audio.src = uri
	//audio.volume = 0
	bpm = 130
	
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
	dimensions = new ShaderProgram(backgroundVertexShader, dimensionsFragmentShader)
	colorShader = new ShaderProgram(backgroundVertexShader, colorFragmentShader)
	drive = new ShaderProgram(backgroundVertexShader, driveFragmentShader)
	bass = new ShaderProgram(backgroundVertexShader, bassFragmentShader)
	
	// post-effects
	fxStripes = new ShaderProgram(backgroundVertexShader, stripesFragmentShader)
	fxBlur = new ShaderProgram(backgroundVertexShader, blurFragmentShader)
	fxChroma = new ShaderProgram(backgroundVertexShader, chromaFragmentShader)
	fxTvSnow = new ShaderProgram(backgroundVertexShader, tvsnowFragmentShader)
	
	timeline = [
		{
			s: 0,
			e: 4,
			sh: colorShader,
			fx: fxTvSnow,
			sh1: [1.0, 1.0, 1.0],
			fx1: 0.0
		},
		{
			s: 4,
			e: 4.1,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 0.0
		},
		{
			s: 4.1,
			e: 4.6,
			sh: colorShader,
			fx: fxTvSnow,
			sh1: [1.0, 1.0, 1.0],
			fx1: 0.0
		},
		{
			s: 4.6,
			e: 4.7,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 0.0
		},
		{
			s: 4.7,
			e: 4.8,
			sh: colorShader,
			fx: fxTvSnow,
			sh1: [1.0, 1.0, 1.0],
			fx1: 0.0
		},
		{
			s: 4.8,
			e: 4.9,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 0.0
		},
		{
			s: 4.9,
			e: 5.2,
			sh: colorShader,
			sh1: [1.0, 1.0, 1.0],
			fx: fxTvSnow,
			fx1: 0.0
		},
		{
			s: 5.2,
			e: 8,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 0.0
		},
		{
			s: 8,
			e: 9,
			sh: testShader2,
			fx: fxStripes
		},
		{
			s: 9,
			e: 9.3,
			sh: testShader2,
			fx: fxChroma
		},
		{
			s: 9.3,
			e: 10,
			sh: testShader2,
			fx: fxStripes
		},
		{
			s: 10,
			e: 16,
			sh: shaderNotStraight,
			fx: fxStripes
		},
		{
			s: 16,
			e: 24,
			sh: testShader,
			fx: fxTvSnow
		},
		{
			s: 24,
			e: 32,
			sh: dimensions,
			fx: fxChroma
		},
		{
			s: 32,
			e: 36,
			sh: drive,
			fx: fxStripes
		},
		{
			s: 36,
			e: 42,
			sh: bass,
			fx: fxStripes
		}
	]
	timeline_text = [
		{
			s: 0,
			e: 4,
			txt: 'titeiko'
		},
		{
			s: 4,
			e: 8,
			txt: 'wsmind'
		},
		{
			s: 8,
			e: 12,
			txt: 'didjor'
		},
		{
			s: 12,
			e: 16,
			txt: 'present'
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

			if (scene.sh1 !== undefined) 
			{
				shader.setVec3Uniform('opt', scene.sh1)
			}
			
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

			if (scene.fx1 !== undefined)
			{
				fx.setFloatUniform('opt', scene.fx1)
			}
			
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
		}
	}

	for (var i = 0; i < timeline_text.length; i++)
	{
		var span = document.getElementById('s')
		var scene = timeline_text[i]
		if ((demoTime >= scene.s) && (demoTime < scene.e))
		{
			span.innerHTML = scene.txt
			var a = Math.min(demoTime - scene.s, scene.e - demoTime)
			if (a > 1) a = 1
			span.style.opacity = a * 0.8
		}
	}
}
