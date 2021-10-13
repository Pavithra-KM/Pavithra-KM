var express = require('express');
var app = express();

// app.get('/',function(req,res){
//     res.send('hello');
// });
app.use(express.static(__dirname + '/htmlpages'))
app.get('/test',function(req,res){
    res.sendFile(__dirname+ '/templates/hello.html')
});
app.listen(3000,function(){
    console.log('server is running');
});