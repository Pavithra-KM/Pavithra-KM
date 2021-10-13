const { response } = require('express');
var express = require('express');
const PORT = process.env.PORT || 3001;
const request = require('request');
var app = express();

app.use(express.static(__dirname + '/public'))
app.get('/',function(req,res){
    res.sendFile(__dirname+ '/public/html/index.html')
});

app.get('/skillsdata',function(req,res){
    
    const options = {
        url: 'https://orchestra.maprecruit.com/sampleskillsdata',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
        },
        json: true,
    };
    
    request(options, function(err, response, body) {
        if(err) throw err;
        let json = JSON.parse(JSON.stringify(body));
        //console.log(json);
        res.send(json)
    });
    
    
});

app.listen(PORT,function(){
    console.log('Server listening on 3001')
});