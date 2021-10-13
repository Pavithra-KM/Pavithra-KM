var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo = db.db('myTable');
    var myObj = [
                    {name:"pavi",address:"ballari"},
                    {name:"virat",address:"delhi"},
                    {name:"appu",address:"bangalore"},
                    {name:"tanu",address:"ballari"},
                    {name:"vinu",address:"ballari"},
                ];   

    dbo.collection('employee').insertMany(myObj,function(err,res){
        if(err) throw err;
        console.log("documents are inserted");
        db.close();
    });
});