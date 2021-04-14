const express=require('express');
const router=express.Router();
const multer=require('multer');
const hashPassword=require('password-hash');
const { collection } = require('../Model/teacherModel');
const TeacherModel=require('../Model/teacherModel')




router.get('/',(req,res)=>{
    res.send("You Got the response from teacher router...");
});
router.post('/pass',(req,res)=>{
    
        const p=hashPassword.generate(req.body.password);
        console.log(hashPassword.verify('1255',p));
        res.send(p);
    

});
var fname='';
var storage = multer.diskStorage({
 
   destination: function(req, file, cb) {
    const ftype=file.mimetype;
    if(ftype=='image/png' || ftype=='image/jpg' || ftype=='image/jpeg' && file.size>=1000000)
    {
        cb(null, './Photo');
    }
    else
    {
        console.log('please select only PNG/ JPG/ JPEG file type and size <=1 MB');
    }
        
     },
    filename: function (req, file, cb) {
        fname= Date.now()+file.originalname;
        cb(null ,fname);
    }
});
var upload = multer({ storage: storage })
router.post('/insert',upload.single('photo'),async(req,res)=>{
    
    console.log('called........');
    const pass=hashPassword.generate(req.body.password);
    const dataSet={
        email:req.body.email,
        photo:"./Photo/"+fname,
        password:pass,
    }
    TeacherModel.create(dataSet,(err,result)=>{
        if(err)
        {
            res.send(err);
            console.log(err);
        }
        else
        {
            res.send(result);
            console.log(result);
        }

    });

});

 //fetch all data
 router.get('/show',async(req,res)=>
 {
     const data= await TeacherModel.find({});
     res.send(data);
     console.log('Yes API Hit');
 });

 //fetchin single record.

 router.get('/show/',async(req,res)=>
 {
     const data= await TeacherModel.find({'_id':req.params});
     res.send(data);
     console.log('Yes API Hit');
 });

 //updating record
 router.put('/update/:id',async(req,res)=>
 {
    const id=req.params.id;
     let data= await TeacherModel.findByIdAndUpdate(id, req.body,{useFindAndModify: false},
    (err, result)=>
     {
        if(err)
        {
            res.send(err);
            res.end();
            console.log('error occured');
            return;

        }
        else
        {
            res.send(
                {
                    status:200,
                    msg:'Data Sucessfully Updated '
                }
            );
            res.end();
            console.log('Thsi record updated',result);
            //console.log(data);
        }
     });
    // console.log(data);
     console.log('Yes API Hit');
 });
 
 //Delete record on the basis of id
 router.delete('/delete/:id', async(req,res)=>
 {
     console.log('delete api called ');
     const id=req.params.id;
     try {
            const data=await TeacherModel.findByIdAndDelete(id,(err,result)=>{
            if(err)
            {
                //res.send("Record of This id is Not exist");
                console.log(err);
                //return null;
            }
            else
            {
                res.send('Record deleted successfully');
                console.log(result);
            }
        });
         
     } catch (error) {
         res.send({
             status:404,
             msg:"Some Error Occured"
         })
     }
    
 });

 router.post('/login',async(req,res)=>{
     console.log('Login api called........');
     const pass=req.body.password;
     const data= await TeacherModel.findOne({email:req.body.email});
     
    const hpass=data.password;
    console.log(pass,"::::::",hpass);
    const vf=hashPassword.verify(pass,hpass);
    if(vf==true)
    {
        res.send('You Succesfully Logedin::>>>');
        console.log('Reeeereeee',data);
    }
    else
    {
        console.log('Login failed');
        res.send('Login failed');
    }
    
 });

 //-------------------------------------dealig with database-----------------
 router.post('/ins',async(req,res)=>{
    
    console.log(' ins API called........');
    console.log(req.body);

    res.send(req.body)


    // const pass=hashPassword.generate(req.body.password);
    // const dataSet={
    //     email:req.body.email,
    //     photo:"./Photo/"+fname,
    //     password:pass,
    // }
    // TeacherModel.create(dataSet,(err,result)=>{
    //     if(err)
    //     {
    //         res.send(err);
    //         console.log(err);
    //     }
    //     else
    //     {
    //         res.send(result);
    //         console.log(result);
    //     }

    // });

});

module.exports=router;
