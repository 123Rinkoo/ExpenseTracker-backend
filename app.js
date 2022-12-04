const express= require('express');
const app=express();
var cors=require('cors');
const UserRoute=require('./Route/User');
const sequelize=require('./util/database');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use('/user', UserRoute);

sequelize
.sync()
.then(result=>{
    app.listen(8000); 
} )
.catch(err=> console.log(err))

// npm init
// npm install nodemon
// npm install express
// ab express require kar lo
// make route

// install sequelize , mysql2
// make util => database, make any model, 
// app.js pe pehli table k liye.