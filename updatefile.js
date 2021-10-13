var http = require('http');
var fs = require('fs');

http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/html'});
    fs.appendFile('task5.txt','example of update file',(err,data) => {
        if(err){
            res.write(err);
        }else{
            res.write('updated');
        }
        res.end();
    });
}).listen(8080);