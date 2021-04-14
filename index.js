const express=require('express');
const path=require('path');
const multer=require('multer');
//var anyBody = require("body/any")
const app=express();
const mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());
//app.use(bodyParser);
// app.use(anyBody)



app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(morgan('dev'));

const StudentRouter=require('./StudentRouter/Srouter');
//const AdminRouter=require('./AdminRouter/demoMail');
const TeacherRouter=require('./TeacherRouter/Trouter')
const AdminRouter=require('./AdminRouter/adminRouter')

//from env file-enviroment variables
const url=process.env.DB_URL;
const port=process.env.SERVER_PORT || 3003; 
//const port=3005;

//db connection
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {console.log('MongoDB connected to the url ::',url);
});

// permission for accessing via axios
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//router
app.use('/Student',StudentRouter); 
app.use('/Teacher',TeacherRouter);
app.use('/Admin',AdminRouter); 



app.listen(port,()=>{
  console.log(`Server is Listen on port ${port} `);
});
