var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Backendend server says:\n Hello World\n Coming soon\n');
}).listen(8080, '10.134.12.160');
console.log('Server running at http://10.134.12.160:8080/');
