const app = require('./app');

const path = require('path');
const connectDatabase = require('./config/databse');


connectDatabase();  

const server = app.listen(process.env. PORT, ()=>{
    console.log(`Hey!!! Server Listening in Port :  ${process.env.PORT} in ${process.env.NODE_ENV}`)
    
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting Server Due to Unhandle Rejection")
    server.close( () =>{
    process.exit(1);
    })
})



process.on('uncaughtException' , (err) =>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting Server Due to Uncaught Exception")
    server.close( () =>{
    process.exit(1);
    })
})
