const express=require('express');
const router=express.Router();
const AdminModel=require('../Model/adminModel');
const PasswordHash=require('password-hash');
const multer=require('multer');
require('dotenv').config();

const jwt=require('jsonwebtoken');

//multer file upload/update for admin insert

let fname='';
var storage = multer.diskStorage({
 
    destination: function(req, file, cb) {
     const ftype=file.mimetype;

     if(ftype=='image/png' || ftype=='image/jpg' || ftype=='image/jpeg' || file.size<=1000000)
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

router.post('/insertimg',upload.single('file'), async(req, res)=>{
  
   
   const photo='./Photo/'+fname;
  
   let data= await AdminModel.findByIdAndUpdate(req.body.id, {photo:photo}, {useFindAndModify: false},
  (err, result)=>
   {
      if(err)
      {
          res.send(err);
          console.log('error occured..');
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
      }
   });

});


router.post('/insert',async(req,res)=>{

    const hp=PasswordHash.generate(req.body.password);
    const dataSet={
        email:req.body.email,
        name:req.body.name,
        password:hp,
    }
    const data=await AdminModel.create(dataSet,(err,result)=>{
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

//login api
router.post('/login',async(req, res)=>{
    let accessToken='';

    console.log(req.body);
    console.log(req.body.email);
    try {

        const data=await AdminModel.findOne({'email':req.body.email});

        console.log('db data',data);
        console.log('db data email',data.email);
        const payload={
            email:data.email,
            password:data.password,
        }
        
        if(data.email===req.body.email)
        {
            const hp=PasswordHash.verify(req.body.password,data.password);
            console.log(hp);
            if(hp===true)
            {
                accessToken=jwt.sign(payload, process.env.JWT_PRIVATE_KEY1);
                console.log('json token ',accessToken);

                res.send({
                    code: 200,
                    msg: 'Successfully loged in',
                    data:data,
                    accessToken:accessToken,
                    
                });
            }
            else
            {
                res.send({
                    code: 404,
                    msg: 'Login Failed password not match',
                    
                });
            }
            console.log(data.email);
        }
        else
        {
            res.send({
                code: 404,
                msg: 'Login Failed password not match',
                
            });
            
        }
        let dummy='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6InNoYTEkM2VmYjkzZjckMSRkYjYxMjgzZjM4YjQwM2RmNjlmNzQ4OThkZTQ2NWZhNWE2MzFjNWUyIiwiaWF0IjoxNjE4MzkwMjIyfQ.L4vbIdFYE-2-QtYRmdsTQdVEVIvSx9Yi4H6sUCxm4F8';
        const tv=jwt.verify(dummy, process.env.JWT_PRIVATE_KEY1);
        console.log('token verify result',tv)

    } catch (error) {
        console.log('error occured');
        console.log(error);
        res.send({
            code:404,
            msg:'Soory Your email address is not valid ....',
            
        })
    }   
});

//priate router--
router.post('/dashboard', (req,res)=>{
    
})

module.exports=router;