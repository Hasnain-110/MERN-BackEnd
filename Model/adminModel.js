const mongoose=require('mongoose');
const{Schema}=require('mongoose');
const adminSchema=new Schema({
    name:{
        type:String,
        
    },
    photo:{
        type:String,
        
    },
    address:{
        type:String,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        
    },
});
const adminModel=mongoose.model('admin',adminSchema);
module.exports=adminModel;