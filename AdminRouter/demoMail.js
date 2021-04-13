"use strict";
const nodemailer = require("nodemailer");
const express=require('express');
const router=express.Router();


router.get('/mail',(req,res)=>{
    console.log('Mail api called');

    const transporter=nodemailer.createTransport({
        service:'hotmail',
       
        auth:{
            user:'web.hasnain@outlook.com',
            pass:'Job@1122',
        }
    });
    const mailOptions={
        from:'web.hasnain@outlook.com',
        to:'mehadi.2025@gmail.com',
        subject:'Nodemailer check',
        text:'Yes you got the mail'
    };
    transporter.sendMail(mailOptions,function(err,info){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(info.response);
            res.send(info);
        }
    })
 });


module.exports=router;