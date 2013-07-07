function startDemo()
{
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
	// drive = new ShaderProgram(colorVertexShader, driveFragmentShader)
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
		// part 1 - Flickering TV
		{
			s: 0,
			e: 4,
			sh: colorShader,
			sh1: [1.0, 1.0, 1.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		{
			s: 4,
			e: 4.1,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		{
			s: 4.1,
			e: 4.6,
			sh: colorShader,
			sh1: [1.0, 1.0, 1.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		{
			s: 4.6,
			e: 4.7,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		{
			s: 4.7,
			e: 4.8,
			sh: colorShader,
			sh1: [1.0, 1.0, 1.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		{
			s: 4.8,
			e: 4.9,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		{
			s: 4.9,
			e: 5.2,
			sh: colorShader,
			sh1: [1.0, 1.0, 1.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		{
			s: 5.2,
			e: 8,
			sh: colorShader,
			sh1: [0.0, 0.0, 0.0],
			fx: fxTvSnow,
			fx1: 1.0
		},
		// part 2 - Rythm paradise
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
			fx1: 1.0
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

		// part 3 - Gay pride
		{
			s: 16,
			e: 17,
			sh: shaderNotStraight,
			sh1: [0, 0, 0],
			shTransition: .75,
			fx: fxStripes
		},
		{
			s: 17,
			e: 20,
			sh: shaderNotStraight,
			sh1: [.75, 0, 0],
			shTransition: 2.25,
			fx: fxTvSnow,
			fx2: 1.0,
			fxTransition: 1.0
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
			sh1: [0.0, 0.4, 0.0],
			fx: fxStripes
		},
		{
			s: 28,
			e: 32,
			sh: fog,
			sh1: [0.0, 0.3, 0.5],
			fx: fxStripes
		},
		{
			s: 32,
			e: 36,
			sh: fog,
			sh1: [0.3, 0.3, 0.],
			fx: fxStripes
		},
		{
			s: 36,
			e: 40,
			sh: fog,
			sh1: [0.5, 0.5, 0.5],
			fx: fxStripes,
			fxTransition: 2
		},
		// part 5 : balles de golf
		{
			s: 40,
			e: 43.3,
			sh: dimensions,
			fx: fxStripes,
			fx1: 2,
			fx2: 1.0,
			fxTransition: -2
		},
		{
			s: 43.3,
			e: 43.9,
			sh: dimensions,
			fx: fxChroma,
		},
		{
			s: 43.9,
			e: 47.3,
			sh: dimensions,
			fx: fxStripes,
			fx2: 1.0
		},
		{
			s: 47.3,
			e: 47.9,
			sh: dimensions,
			fx: fxChroma,
		},
		{
			s: 47.9,
			e: 51.3,
			sh: dimensions,
			fx: fxStripes,
			fx2: 1.0
		},
		{
			s: 51.3,
			e: 51.9,
			sh: dimensions,
			fx: fxChroma,
		},
		{
			s: 51.9,
			e: 56,
			sh: dimensions,
			fx: fxStripes,
			fx2: 1.0,
			fxTransition: 2,
		},
		{
			s: 56,
			e: 60,
			sh: fog,
			sh1: [0.5, 0.0, 0.0],
			fx: fxDistorsion,
			fx1: 1,
			fx2: 1,
			fxTransition: -1
		},
		{
			s: 60,
			e: 64,
			sh: glowglobes,
			sh1: [2., 0., 0.],
			fx: fxStripes,
			fxTransition: 1,
		},
		{
			s: 64,
			e: 68,
			sh: glowglobes,
			sh1: [2., 0., 0.],
			fx: fxDistorsion,
			fx1: 1,
			fxTransition: -1
		},
		{
			s: 68,
			e: 72,
			sh: glowglobes,
			sh1: [2., 0., 0.],
			fx: fxDistorsion,
			fxTransition: 1
		},
		{
			s: 72,
			e: 76,
			sh: bass,
			fx: fxStripes
		},
		{
			s: 76,
			e: 79,
			sh: shaderNotStraight,
			sh1: [0, 0, 0],
			shTransition: 3.2,
			fx: fxTvSnow,
			fx2: 1.0
		},
		{
			s: 79,
			e: 84,
			sh: bass,
			fx: fxStripes,
			fxTransition: 2.0,
		},
		{
			s: 84,
			e: 88,
			sh: shaderNotStraight,
			sh1: [0, 0, 0],
			shTransition: 3.2,
			fx: fxTvSnow,
			fx2: 1.0,
			fxTransition: 1.0
		},
		
		
		{
			s: 88,
			e: 96,
			sh: terrain,
			fx: fxStripes,
		},
		{
			s: 96,
			e: 100,
			sh: terrain,
			fx: fxStripes,
			fx2: 0.0,
			fxTransition: 2.0
		},
		
		
		
		{
			s: 100,
			e: 108,
			sh: colorShader,
			sh1: [0., 0., 0.],
			fx: fxStripes
		},
		{
			s: 108,
			e: 120,
			sh: fog,
			fx: fxTvSnow,
			fx2: 1.0,
			fxTransition: 1
		},
		{
			s: 120,
			e: 121,
			sh: colorShader,
			sh1: [0., 0., 0.],
			fx: fxTvSnow,
			fx1: 1.0,
			fx2: 1.0,
			fxTransition: -1
		},
		{
			s: 121,
			e: 125,
			sh: colorShader,
			sh1: [1., 1., 1.],
			fx: fxPowerOff,
			fx1: 0.3,
			fxTransition: 1.5
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
			txt: "did'"
		},
		{
			s: 22.8,
			e: 22.9,
			txt: ''
		},
		{
			s: 104.0,
			e: 108,
			txt: 'CRTeCK'
		},
		{
			s: 108,
			e: 108.1,
			txt: ''
		}
	]
}

function updateDemo()
{
	var demoTime = audio.currentTime * bpm / 120.0
	
	gl.viewport(0, 0, canvas.width, canvas.height)
	
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
				var sh1 = scene.sh1.slice(0);
				if (scene.shTransition !== undefined)
				{
					var delta = (scene.shTransition * demoTime - scene.shTransition * scene.s) / (scene.e - scene.s);

					sh1[0] += delta;
					sh1[1] += delta;
					sh1[2] += delta;
				}
				shader.setVec3Uniform('opt', sh1);
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
			
			var fx1 = (scene.fx1 !== undefined) ? scene.fx1 : 0.0;
			if (scene.fxTransition !== undefined)
			{
				fx1 += (scene.fxTransition * demoTime - scene.fxTransition * scene.s) / (scene.e - scene.s)
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
