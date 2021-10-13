var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./task1.html',function(err,data){
      if(err){
          res.write('File Not Found');
      }else{
          res.write(data);
      }
      res.end();
  });
}).listen(8080);