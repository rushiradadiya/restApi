require('./config/config.js');
const _= require('lodash');
const express = require('express');
const bodyParser = require('body-parser')
const {ObjectID} =require('mongodb');
var {mongoose} = require('./db/mongoose.js');
const port = process.env.PORT || 3000;
var {Student} = require('./models/student');
//var {authenticate} = require('./middleware/authentication.js');   
var app = express();

console.log(port);
app.use(bodyParser.json())

app.post('/student',(req,res)=>{
    var student =new Student({
        name : req.body.name,
        address:req.body.address,
        gender:req.body.gender,
        age:req.body.age,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
    });
    
    student.save().then((doc)=>{
      res.send(doc);
  },(e) =>{
      res.status(400).send(e);
  });
});

app.get('/student',(req,res)=>{
    Student.find().then((student)=>{
   //console.log(req);
   res.send({student});
   },(e)=>{
       res.status(400).send(e);
   }) ;
});

app.get('/student/:id',(req,res)=>{
    // console.log(req);
    var id = req.params.id;
    //validate
    //find by text
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Student.findById(id).then((student)=>{
        if (!student){
             return res.status(404).send();
        }
      
       res.send({student});
    }).catch((e)=>{
        res.status(400).send();
    });
    
    
    //res.send(req.params);
});



app.delete('/student/:id',(req,res)=>{
    var id = req.params.id;
    
    console.log(id);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
//Lanet.findOneAndRemove({_id:'5c14e6f1003a8b040cc13880'}).then((lanet)=>{
//  console.log(lanet);
//});

Student.findByIdAndRemove(id).then((student)=>{
    console.log("-------------------enter----------------"+student);
    if(!student){
        return res.status(404).send();
    }
    res.send(student);
}).catch((e)=>{
    res.status(400).send();
});
    
    
});

app.patch('/student/:id',(req,res)=>{
    
    console.log(body);
    var id = req.params.id;
    var body = _.pick(req.body,['name','age','address','email','password','gender','phone']);
      if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    // if(_.isBoolean(body.completed)&&body.completed)
    //     {
    //         body.completedAt = new Date().getTime();
    //     }
    // else{
    //     body.completed = false;
    //     body.completedAt = null;
    // }
    
    Student.findByIdAndUpdate(id,{$set:body},{new:true}).then((student)=>{
        console.log(student)
        if(!student){
            return res.status(404).send();
        }
           res.send(student);
    }).catch((e)=>{
        res.status(400).send();
    });
 
    
})

//POST/users

// app.post('/user',(req,res)=>{
//     var body = _.pick(req.body,['email','password']);
//     var user = new User(body);
  
//     user.save().then((user)=>{
//           console.log("rushita --------------------"+user);
//        return user.generateAuthToken();
        
//     }).then((token)=>{
//         res.header('x-auth',token).send(user);
//         res.send(user);
// //        console.log(req.header('x-auth1'));
//     }).catch((e)=>{
//          res.send(e);
//         res.status(400).send();
//     });
// });




// app.get('/user/me',authenticate,(req,res) =>{
    
//          res.send(req.user);
// })





app.listen(port,() =>{
    console.log(`Strated up to port ${port}`);
});

module.exports = {app};