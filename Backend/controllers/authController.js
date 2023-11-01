const catchAsyncError = require('../middleware/catchAsyncError')
const  user = require('../models/usermodel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto');
  
// Register User - api/v1/register
exports.registerUser = catchAsyncError (async (req,res,next) =>{

    const {name,email, password } = req.body;     
    console.log("******************",name,email,password)
   
    let avatar; 
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){    
      //avatar = `${req.protocol}://${req.host}/upload/user/${req.file.originalname}`
      avatar = `${BASE_URL}/upload/user/${req.file.originalname}`  
     

      console.log("*********avatar******",avatar)    
    }
   const User = await user.create({  
        name,email,password,avatar
     });   
    
     sendToken(User, 201, res);
})
// Login User - api/v1/login
exports.loginUser = catchAsyncError( async(req,res,next) =>{
 const {email,password} = req.body;
 console.log("email --", email, "-- pasword --", password)
   if(!email || ! password){
      console.log("Enter Email & Password")
     return next(new ErrorHandler("Enter Email & Password" ,400))
   }
   // Find the user by checking email and password in the database
   const actualuser = await user.findOne({email}).select('+password');
   console.log("actualuser---",actualuser)
   if(!actualuser){
      console.log("Enter 1st invlaid")
      return next(new ErrorHandler("Invalid Email & Password" , 401));
   }
   if(! await actualuser.isValidPassword(password)){    
      console.log("Enter 2nd invalid ")
      return next(new ErrorHandler("Invalid Email & PAssword" , 401));
   }
   console.log("actualuser---",actualuser)
   sendToken(actualuser, 201, res);

})
// Logout User - api/v1/logout
exports.logoutUser = (req,res, next) =>{
      res.cookie("token",null,{
         expires: new Date(Date.now()),
         httpOnly : true
         })
      .status(200).json({
           success: true,
           message: "Logged out"
      })
}    

// password forget - api/v1/password/forget
exports.forgetPassword = catchAsyncError( async( req,res, next) => {
   const User = await user.findOne({email : req.body.email})

   if(!User) {
      return next(new ErrorHandler("User Not Found with this email" , 404));
      }
   const  resetToken = User.getresetToken();
   await  User.save({validateBeforeSave : false});
    console.log("resettoken -",resetToken)
   // create reset url
  // This is used for testing backend side during development const resetURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken} ` ;
 
 
 
  let BASE_URL = process.env.FRONTEND_URL;
  if(process.env.NODE_ENV === "production"){
      BASE_URL = `${req.protocol}://${req.get('host')}` 
  }

 
  const resetURL = `${BASE_URL}/password/reset/${resetToken} ` ;
   console.log("PASWORD RESET TOEKN URL-------------->" ,resetURL)
   const message = ` Your Password reset url is as follow \n\n\n 
       ${resetURL} \n\n If you have not requested this password reset kindly ignore it ` ;
         try{
               sendEmail({
                     email:User.email,
                     subject:"Password Recovery",
                     message 
               })
               res.status(200).json({
               success:true,
               message : ` Email Send to ${User.email} `
               })
            }catch(error){  
               User.resetpasswordtoken = undefined;
               User.resetpasswordtokenexpire = undefined;
               await User.save({validateBeforeSave: false});
               return next(new ErrorHandler(error.message , 500 ))  
            }
})
// Reset password - api/v1/password/reset : token
exports.resetPassword  = catchAsyncError ( async (req,res,next) =>{   
 console.log("reset password")  
   const resetpasswordtoken  = crypto.createHash('sha256').update(req.params.token).digest('hex');     
     const User = await user.findOne({   
      resetpasswordtoken,
      resetpasswordtokenexpire : {  
            $gt :Date.now()
      }
     })
     console.log("USER --->",User);
     console.log("req.body --->",req.body);
     if(!User){
         return next(new ErrorHandler("Password Reset Token is Invalid or Expires" ))  
      }   
      if(req.body.password !== req.body.confirmpassword){
         return next(new ErrorHandler("Password Does Not Match" ))
      }
     
      User.password = req.body.password;
      User.resetpasswordtoken = undefined;
      User.resetpasswordtokenexpire = undefined;
      await User.save({validateBeforeSave: false})
      sendToken(User, 201, res);
})

//Get User Profile - api/v1/profile
exports.getUserProfile = catchAsyncError( async( req,res,next) =>{
   const User =  await user.findById(req.user.id)
    res.status(200).json({
      status : true,
        User
    })
})  

//Change Password - api/v1/password/change
exports.passwordChange = catchAsyncError( async( req,res,next) =>{
   const User =  await user.findById(req.user.id).select('+password')
    console.log("password change -->", User.password);

   //check old password   
   if(! await User.isValidPassword(req.body.oldpassword)){
      return next(new ErrorHandler("Old Password is Incorrect"));  
   }
   //assign new password
   User.password = req.body.password;
   await User.save();
    res.status(200).json({
      status : true
          
    })
})  

//Update Profile - api/v1/profile/update
exports.profileUpdate = catchAsyncError( async( req,res,next) =>{  
   let newUserData = {
      name : req.body.name,
      email : req.body.email
   }
    let avatar ;
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){      
       avatar = `${BASE_URL}/upload/user/${req.file.originalname}` 
       newUserData = {...newUserData, avatar};    
   }
  
   const User = await user.findByIdAndUpdate(req.user.id, newUserData,{
         new : true,
         runValidators : true
   })

      res.status(200).json({
      status : true,
      User
      
    })
})  


//Admin Roles - Get All Users
exports.getAllUser = catchAsyncError( async( req,res,next) =>{
         const Users = await user.find();

      res.status(200).json({
      status : true,
      Users
      
    })
})  
//Admin Roles - Get Particular  User
exports.getSingleUser = catchAsyncError( async( req,res,next) =>{
   const User = await user.findById(req.params.id);
   if(!User){
      return next(new ErrorHandler(`User Nor Found in this is ${req.params.id}`));  
   }

res.status(200).json({
status : true,
User

})
})  
//Admin Update- User
exports.updateUser = catchAsyncError( async( req,res,next) =>{
   console.log(" update user -->" ,req.body.name," update email -->" ,req.body.email,
   " update role -->" ,req.body.role)  
   const newUserData = {
      name : req.body.name,
      email : req.body.email,
      role : req.body.role
   }
   const User = await user.findByIdAndUpdate(req.params.id, newUserData,{
         new : true,
         runValidators : true
   })
res.status(200).json({
status : true,
User

})
}) 


//Admin Delete- User
exports.deleteUser = catchAsyncError( async( req,res,next) =>{
   console.log("@ delete user ---")
   const User = await user.findById(req.params.id);
   if( !User){
      return next(new ErrorHandler(`User Nor Found in this is ${req.params.id}`));  
   }
  
   await user.findByIdAndDelete(req.params.id);
    
   res.status(200).json({
   status : true,


   })
}) 


