var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo = db.db('myTable');
    var myQuery = { address: /^B/ };
    var newValue = {$set:{address:"karnataka"}};
    dbo.collection('employee').updateOne(myQuery,newValue,function(err,res){
        if(err) throw err;
        console.log(' documents are updated');
        db.close();
    });
});