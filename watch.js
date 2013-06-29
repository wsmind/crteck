#!/usr/bin/env node

var fs = require("fs")
var path = require("path")

function onChange(event, filename)
{
	console.log(event, filename)
	
	// rebuild demo
	var child_process = require("child_process")
	var builder = child_process.spawn("node", ["build.js"])
}

fs.watch(path.join(__dirname, "js"), onChange)
fs.watch(path.join(__dirname, "meshes"), onChange)
fs.watch(path.join(__dirname, "music"), onChange)
fs.watch(path.join(__dirname, "shaders"), onChange)
