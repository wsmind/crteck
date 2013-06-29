#!/usr/bin/env node

var assert = require("assert")
var fs = require("fs")
var path = require("path")
var child_process = require("child_process")
var lineReader = require("line-reader")
var rimraf = require("rimraf")

function buildShader(shaderName, callback)
{
	var builder = child_process.spawn("node", ["./node_modules/glsl-unit/bin/template_glsl_compiler", "--input=shaders/" + shaderName + ".glsl", "--variable_renaming=INTERNAL", "--output=build/" + shaderName + ".glsl.min"])
	builder.on("exit", function(code)
	{
		assert(code == 0)
		
		var nextLineContent = null
		lineReader.eachLine("build/" + shaderName + ".glsl.min", function(line, last)
		{
			if (nextLineContent && (line !== ""))
			{
				var jsString = "var " + nextLineContent + '="' + line + '"\n'
				fs.writeFileSync(path.join("build", nextLineContent + ".js"), jsString, "utf8")
				nextLineContent = null
			}
			else if (line == "//! VERTEX")
			{
				nextLineContent = shaderName + "VertexShader"
			}
			else if (line == "//! FRAGMENT")
			{
				nextLineContent = shaderName + "FragmentShader"
			}
			
			if (last)
				callback()
		})
	})
}

function buildAllShaders(callback)
{
	// build all shaders found in the shaders/ folder
	var built = 0
	fs.readdir("shaders", function(err, files)
	{
		for (var i = 0; i < files.length; i++)
		{
			buildShader(path.basename(files[i], ".glsl"), function()
			{
				built++
				if (built == files.length)
					callback()
			})
		}
	})
}

function exportMeshes(callback)
{
	/*var exporter = child_process.spawn("C:/Program Files/Blender Foundation/Blender/blender.exe", ["-b", "meshes/all-meshes.blend", "-P", "export-meshes.py"])
	exporter.on("exit", function(code)
	{
		assert(code == 0)
		
		var exporter2 = child_process.spawn("C:/Program Files/Blender Foundation/Blender/blender.exe", ["-b", "meshes/greets.blend", "-P", "export-meshes.py"])
		exporter2.on("exit", function(code)
		{
			assert(code == 0)
			
			var exporter3 = child_process.spawn("C:/Program Files/Blender Foundation/Blender/blender.exe", ["-b", "meshes/basic.blend", "-P", "export-meshes.py"])
			exporter3.on("exit", callback)
		})
	})*/
	callback()
}

function concatenateSources(callback)
{
	// debug helper
	fs.appendFileSync("build/all.js", "\"use strict;\"\n", "utf8")
	
	// concatenate all js file in one big chunk
	fs.readdir("js", function(err, jsFiles)
	{
		// append generated shader files
		fs.readdir("build", function(err, buildFiles)
		{
			for (var i = 0; i < buildFiles.length; i++)
			{
				if (path.extname(buildFiles[i]) == ".js")
				{
					console.log("appending " + buildFiles[i])
					var code = fs.readFileSync("build/" + buildFiles[i], "utf8")
					fs.appendFileSync("build/all.js", code, "utf8")
				}
			}
			
			// special case for entry point; we must ensure it is the last file appended
			var entryIndex = jsFiles.indexOf("main.js")
			jsFiles.splice(entryIndex, 1)
			jsFiles.push("main.js")
			
			for (var i = 0; i < jsFiles.length; i++)
			{
				if (path.extname(jsFiles[i]) == ".js")
				{
					console.log("appending " + jsFiles[i])
					var code = fs.readFileSync("js/" + jsFiles[i], "utf8")
					fs.appendFileSync("build/all.js", code, "utf8")
				}
			}
			
			callback()
		})
	})
}

// create an unpacked version that directly references all.js
function makeUnpacked()
{
	var unpackedPage = "<!DOCTYPE html>\n<html><body><canvas id='V'></canvas><script type='text/javascript' src='all.js'></script><body></html>"
	fs.writeFileSync("build/unpacked.html", unpackedPage, "utf8")
}

function pack()
{
	var packer = child_process.spawn("jsexe", ["build/all.js", "build/packed.html"])
	packer.on("exit", function(code)
	{
		assert(code == 0)
	})
}

rimraf("build", function(err)
{
	setTimeout(function()
	{
		fs.mkdir("build", function(err)
		{
			if (err) throw err
			
			buildAllShaders(function()
			{
				exportMeshes(function()
				{
					concatenateSources(function()
					{
						makeUnpacked()
						
						if (process.argv.indexOf("--pack") != -1)
							pack()
					})
				})
			})
		})
	}, 500)
})
