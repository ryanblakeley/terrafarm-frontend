var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n Coming Soon\n');
}).listen(3000, '10.134.12.160');
console.log('Server running at http://10.134.12.160:3000/');
