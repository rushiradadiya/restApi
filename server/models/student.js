var mongoose = require('mongoose');

var Student = mongoose.model('student',{

   name:{
       type:String,
       required:true,
       minlength: 1,
       trim:true
       
   },
   address:{
       type:String,
       required:true,
       minlength: 1,
       trim:true  
   },
   gender:{
        type:String,
       required:true,
        minlength: 1,
        trim:true  
    },
    age:{
        type:Number,
       required:true,
        minlength: 1,
        trim:true
        
    },
    phone:{
        type:Number,
        required:true,
        minlength: 1,
        trim:true  
    },
    email:{
         type:String,
         required:true,
         minlength: 1,
         trim:true  
     },

     password:{
        type:String,
       required:true,
        minlength: 1,
        trim:true
        
    },
   
});

//var newLanet = new Lanet({
//    text:'software Company'
//});
//
//newLanet.save().then((doc) =>{
//    console.log('save data',doc);
//},(e)=>{
//    console.log('Unable to save data');
//});

module.exports ={Student};
