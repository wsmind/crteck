var http = require("http")
var fs = require("fs")
var url = require("url")
var path = require("path")

var server = http.createServer(function(request, response)
{
	var resourcePath = url.parse(request.url).pathname
	
	if (resourcePath == "/")
		resourcePath = "/index.html"
	
	console.log("request for " + resourcePath)
	
	var filePath = path.join(process.cwd(), resourcePath)
	path.exists(filePath, function(exists)
	{
		if (exists)
		{
			var fileStream = fs.createReadStream(filePath)
			fileStream.pipe(response)
		}
		else
		{
			response.statusCode = 404
			response.end()
		}
	})
})

server.listen(8080)
