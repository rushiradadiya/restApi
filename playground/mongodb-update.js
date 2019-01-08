//const MongoClient =require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

MongoClient.connect('mongodb://localhost:27017/student', (err, client) => {
    if(err){
        
     return console.log("can not connect to mongo db");}
    console.log("connection established");
    
    var db = client.db('student');
    
 
    
    db.collection('student').findOneAndUpdate({
        _id: new ObjectID('5c124c9c9b3ba01b3cf3ac0f')},
        {
            $set:{
                    complete:true                                 
                 }
        },{
        returnOriginal:false
    }).then((result) => {
        console.log(result);
    })
                                       
    
    
      db.collection('student').findOneAndUpdate({
        _id: new ObjectID('5c124c9c9b3ba01b3cf3ac0f')},
        {
            $set:{
                    name:'Axi'
                 },
          $inc:{
              age:1
          }
        },{
        returnOriginal:false
    }).then((result) => {
        console.log(result);
    }) 
    });

    
    
  
    
   // client.close();
