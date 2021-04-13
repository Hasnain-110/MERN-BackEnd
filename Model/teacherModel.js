const mongoose=require('mongoose');
const{Schema}=require('mongoose');
const teacherSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        
    },
    photo:{
        type:String,

    }
});
const teacherModel=mongoose.model('teacher',teacherSchema);
module.exports=teacherModel;