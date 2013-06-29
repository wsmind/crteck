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
	colorShader = new ShaderProgram(colorVertexShader, colorFragmentShader)
	terrain = new ShaderProgram(colorVertexShader, terrainFragmentShader)
	dimensions = new ShaderProgram(colorVertexShader, dimensionsFragmentShader)
	shaderNotStraight = new ShaderProgram(colorVertexShader, notstraightFragmentShader)
	drive = new ShaderProgram(colorVertexShader, driveFragmentShader)
	bass = new ShaderProgram(colorVertexShader, bassFragmentShader)
	fog = new ShaderProgram(colorVertexShader, fogFragmentShader)
	glowglobes = new ShaderProgram(colorVertexShader, glowglobesFragmentShader)
	
	// post-effects
	fxStripes = new ShaderProgram(stripesVertexShader, stripesFragmentShader)
	fxBlur = new ShaderProgram(stripesVertexShader, blurFragmentShader)
	fxChroma = new ShaderProgram(stripesVertexShader, chromaFragmentShader)
	fxDistorsion = new ShaderProgram(stripesVertexShader, distorsionFragmentShader)
	fxTvSnow = new ShaderProgram(stripesVertexShader, tvsnowFragmentShader)
	fxPowerOff = new ShaderProgram(stripesVertexShader, poweroffFragmentShader)
	
	timeline = [
		// part 1
		{
			s: 0,
			e: 4,
			sh: colorShader,
			fx: fxTvSnow,
			sh1: [1.0, 1.0, 1.0],
		},
		{
			s: 4,
			e: 4.1,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
		},
		{
			s: 4.1,
			e: 4.6,
			sh: colorShader,
			fx: fxTvSnow,
			sh1: [1.0, 1.0, 1.0],
		},
		{
			s: 4.6,
			e: 4.7,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
		},
		{
			s: 4.7,
			e: 4.8,
			sh: colorShader,
			fx: fxTvSnow,
			sh1: [1.0, 1.0, 1.0],
		},
		{
			s: 4.8,
			e: 4.9,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
		},
		{
			s: 4.9,
			e: 5.2,
			sh: colorShader,
			sh1: [1.0, 1.0, 1.0],
			fx: fxTvSnow,
		},
		{
			s: 5.2,
			e: 8,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
		},
		// part 2
		{
			s: 8,
			e: 8.75,
			sh: terrain,
			fx: fxStripes
		},
		{
			s: 8.75,
			e: 9.25,
			sh: terrain,
			fx: fxChroma
		},
		{
			s: 9.25,
			e: 10,
			sh: terrain,
			fx: fxStripes,
		},

		{
			s: 10,
			e: 11.5,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
		},
		{
			s: 11.5,
			e: 13,
			sh: terrain,
			fx: fxStripes,
		},
		{
			s: 13,
			e: 13.6,
			sh: terrain,
			fx: fxChroma,
		},
		{
			s: 13.2,
			e: 16,
			sh: terrain,
			fx: fxStripes,
		},

		// part 3
		{
			s: 16,
			e: 17,
			sh: shaderNotStraight,
			fx: fxStripes
		},
		{
			s: 17,
			e: 20,
			sh: shaderNotStraight,
			fx: fxTvSnow,
			transition: 1.0,
			fx2: 1.0
		},

		{
			s: 20,
			e: 24,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxStripes
		},

		// part 4 : horloge tournante
		{
			s: 24,
			e: 28,
			sh: fog,
			fx: fxStripes,
			sh1: [0.0, 0.4, 0.0]
		},

		{
			s: 28,
			e: 32,
			sh: fog,
			fx: fxStripes,
			sh1: [0.4, 0.4, 0.]
		},
		{
			s: 32,
			e: 36,
			sh: fog,
			fx: fxStripes,
			sh1: [0.6, 0.5, 0.2]
		},
		// part 5 : balles de golf
		{
			s: 36,
			e: 48,
			sh: dimensions,
			fx: fxStripes
		},
		{
			s: 48,
			e: 52,
			sh: dimensions,
			fx: fxTvSnow,
			transition: 1
		},

		{
			s: 52,
			e: 56,
			sh: fog,
			fx: fxDistorsion,
			transition: 1,
			sh1: [0.5, 0.0, 0.0]
		},
		{
			s: 56,
			e: 60,
			sh: glowglobes,
			sh1: [2., 0., 0.],
			fx: fxStripes
		},
		{
			s: 60,
			e: 68,
			sh: glowglobes,
			sh1: [2., 0., 0.],
			fx: fxDistorsion,
			transition: 1
		},
		{
			s: 68,
			e: 76,
			sh: glowglobes,
			sh1: [2., 0., 0.],
			fx: fxStripes
		},
		{
			s: 76,
			e: 84,
			sh: bass,
			fx: fxStripes
		},
		{
			s: 108,
			e: 116,
			sh: colorShader,
			sh1: [0., 0., 0.],
			fx: fxStripes
		},
		{
			s: 116,
			e: 120,
			sh: fog,
			fx: fxTvSnow,
			fx2: 1.0,
			transition: 1
		},
		{
			s: 120,
			e: 124,
			sh: colorShader,
			fx: fxTvSnow,
			fx2: 1.0,
			transition: -1
		},
		{
			s: 124,
			e: 128,
			sh: colorShader,
			sh1: [1., 1., 1.],
			fx: fxPowerOff
		}
	]
	timeline_text = [
		{
			s: 5.5,
			e: 8,
			txt: 'titeiko'
		},
		{
			s: 8,
			e: 8.1,
			txt: ''
		},
		{
			s: 10,
			e: 11.5,
			txt: 'wsmind'
		},
		{
			s: 11.5,
			e: 11.6,
			txt: ''
		},
		{
			s: 20.3,
			e: 22.8,
			txt: 'didjor'
		},
		{
			s: 22.8,
			e: 22.9,
			txt: ''
		},
		{
			s: 108.0,
			e: 116,
			txt: 'CRTECK'
		},
		{
			s: 116,
			e: 116.1,
			txt: ''
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
			
			var fx1 = (scene.fx1 !== undefined) ? scene.fx1 : 1.0
			if (scene.transition !== undefined)
			{
				fx1 *= (scene.transition * demoTime - scene.transition * scene.s) / (scene.e - scene.s)
			}
			fx.setFloatUniform('opt', fx1)
			
			var fx2 = (scene.fx2 !== undefined) ? scene.fx2 : 0.0
			fx.setFloatUniform('opt2', fx2)
			
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
