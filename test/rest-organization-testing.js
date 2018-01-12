const http = require('http');
const fs = require('fs');
const restify = require('restify');

const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('../view/index.html', function(err, html) {
    if (err) {
        throw err;
    }

    const server = http.createServer(function(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        handleRequest(req, res);
    });

    function handleRequest(req, res) {
        for (var method in endpointMapper) {
            if (req.method === method) {
                res.end(endpointMapper[method].endpoints[req.url.slice(1)]);
				return;
            }
        }
		res.end("WRONG METHOD!");
    }

    var endpointMapper = {
        "GET": {
            "endpoints": {
                "test": "GET test successful!",
                "healthscheck": "You are totally and absolutely healthy! No doubt about that whatsoever!"
            }
        },
        "POST": {
            "endpoints": {
                "test": "POST test successful!",
                "person": "{name: 'Pera',age: 27,address: '15 Asylum Street'}"
            }
        }
    };

    server.listen(port, hostname, function() {
        console.log('Prismatic Core: Online');
    });

});