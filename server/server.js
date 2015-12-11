//console.log("Hello from Nodejs")
var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var exec = require('child_process').exec,
    child;

http.createServer(function (request, response) {
    request.content = '';
    request.addListener("data", function (data) {
        request.content += data;
    });

    request.addListener("end", function () {
        if (request.content.trim()) {
            request.content = querystring.parse(request.content);
            var data = request.content['data'];
            var frame = request.content['frame'].toString();
            data = data.replace(/^data:image\/\w+;base64,/, "");
            var buffer = new Buffer(data, 'base64');
            fs.writeFile('Images/' + 'screen-' + (frame) + '.png',
                buffer.toString('binary'), 'binary');
//            child = exec('cd C:\\ExportXml3DMaster\\xml3d-blender-exporter-master\\PerceptualImageDiff && perceptualdiff.exe sponzaAOpng.png screen-' + (frame) + '.png > screen-' + (frame) + '.txt',
//                function (error, stdout, stderr) {
//                    console.log('stdout: ' + stdout);
//                    console.log('stderr: ' + stderr);
//                    if (error !== null) {
//                        console.log('exec error: ' + error);
//                    }
//                });
        }
    });
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With'
    });
    response.end();
}).listen(8080, "localhost");





