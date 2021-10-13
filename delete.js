var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo = db.db('myTable');
    var myQuery = {name:"pavi"};
    dbo.collection('employee').deleteMany(myQuery,function(err,res){
        if(err) throw err;
        console.log(' documents are deleted');
        db.close();
    });
});