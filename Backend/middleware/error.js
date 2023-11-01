const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req,res,next) =>{
console.log("err.status code->",err.statuscode);
    err.statuscode = err.statuscode || 500;
    console.log("after --->",err.statuscode);


    if(process.env.NODE_ENV == 'development'){  
        res.status(err.statuscode).json({
            success:false,
            message: err.message,
            stack : err.stack,
            error:err
    })
    }    

    if(process.env.NODE_ENV == 'production'){
        let message = err.message;
        let error = new Error(message);

        if(err.name == "ValidationError"){  
            console.log("ERROR PRODUCTION Validationerror")
            message = Object.values(err.errors).map(value =>value.message) 
            error = new Error(message);  
            err.statuscode = 400;
           // error = new ErrorHandler(message, err.statuscode)
        }

        
        if(err.name == "CastError"){
            console.log("ERROR PRODUCTION CastError");
            message = ` Resource Not Found :  ${error.path}`;
            error = new Error(message); 
            err.statuscode = 400;
        }
        if(err.code == 11000 ){
            console.log("ERROR 11000");
            message = ` Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message); 
            err.statuscode = 400;
        }  
        res.status(err.statuscode).json({
            success:false,
            message: error.message ||'Internal Server Error'
         
    })      
    }  






}