const express = require('express');
const mongoose  = require('module');
const dbconfig = require('./config/db.config');
const auth = require('./middleware/auth');
const erros = reqiure('./middleware/erros');
const unless = require('express-unless');
const app = express();


mongoose.promise = global.promise;
mongoose.connect(dbconfig.db,{
    userNewUrlParser : true,
    userUnifiedTopology : true
}).then(
    () =>{
        console.log('db connected sucessufuly');
    
    }),
    (errors)=>{
        console.log('Failed to connect to the db');
    };

    auth.authenticateToken.unless = unless;
    app.use(
        auth.authenticateToken.unless({
            path:[
                {url : ".users/login",methods:["POST"]},
                {url : ".users/register",methods:["POST"]}
            ],
        })
    );
 app.use(express.json());
 app.use("/users", require("./routers/user.touters"));
 app.use(errors.errorHandler);
 app.listen(process.env.port || 3000 , function(){
    console.log('Listening on port 3000...')

 })
  
