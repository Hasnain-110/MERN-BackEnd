const express=require('express');
const { collection } = require('../Model/studentModel');
const router=express.Router();
const studentModel=require('../Model/studentModel')


router.get('/', async(req,res)=>
{
    res.send(["Mohan", "Sohan", "Syed", "Mirza"]);
    res.end();
});
router.post('/insert',async (req,res)=>{
    console.log(req.body);
    
    const dataSet={
        email:req.body.email,
        name:req.body.name,
    }
    console.log('dataSet ::', dataSet)
    await studentModel.create(dataSet,(err, result)=>
    {
        if(err)
        {
            res.send(err.message);
        }
        else
        {
            res.send(result);
            console.log('Resul---',result);
        }
    });
});
router.get('/show', async(req,res)=>
{
    const data=await studentModel.find({});
    res.send(data);
    console.log(data);
});
module.exports=router;