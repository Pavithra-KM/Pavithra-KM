var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.redirect('https://www.redbus.com')
});
app.listen(8080);