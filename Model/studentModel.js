const mongoose=require('mongoose');
const{Schema}=require('mongoose');
const studentSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },  
    age:{
        type:Number,
        
    },
    gender:{
        type:String,

    },
    photo:{
        type:String,
    },
   
    password:
    {
        type:String,
    }
});
const studentModel=mongoose.model('student',studentSchema);
module.exports=studentModel;