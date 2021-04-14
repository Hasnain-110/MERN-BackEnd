const express=require('express');
const router=express.Router();



router.post('/insert',(req,res)=>{
    const data=req.body;
    console.log("data");

});

router.post('/login',(req, res)=>{


});

module.exports=router;