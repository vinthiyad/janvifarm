const catchasyncerror = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const user = require("../models/usermodel");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchasyncerror(async  (req,res,next)=>{  
    const{ token } = req.cookies;
    console.log("token --vvvvv",token)
    console.log("**************************")
    if(!token){
        return next(new ErrorHandler("Login Required",401))
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id);
    console.log("req.user--->" , req.user)
    next(); 
})

exports.authorizationRoles = (...roles) =>{
       return (req, res, next) =>{
        if(!roles.includes(req.user.role)){  
        return next(new ErrorHandler(`Role ${req.user.role} is Unauthorized`,401))   
        }
        next();

    }
}