const mongoose = require('mongoose');
const bcrypr = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true, 'Please Enter Name']
    },
    email:{
        type: String,
        required : [true, 'Please Enter Email'],
        unique : true,
        validator : [validator.isEmail, "Enter Valid Email"] 
    },
    password:{
        type: String,
        required : [true, 'Please Enter Password'],
        maxlength : [6, "Password cannot exceed 6 characters"],  
        select : false
    },
    avatar:{
        type: String,
        
    },
    role:{
        type : String,
        default : 'user'
    },
    resetpasswordtoken : String,
    resetpasswordtokenexpire : Date,
    createdat:{
        type : Date,
        default : Date.now
    }

})
// password hasing using bycrypt 
userSchema.pre('save' , async function(next){
    console.log("this password ----0",this.password)
    if(!this.isModified('password')){    
            next();
    }
    this.password = await bcrypr.hash(this.password,10);
})

userSchema.methods.getJWToken = function(){
     return  jwt.sign({id:this.id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRE_TIME})
}            

userSchema.methods.isValidPassword = async function(enteredpassword){
    console.log("enteredpassword --",enteredpassword , "this password --", this.password)
    console.log(await bcrypr.compare(enteredpassword, this.password) )
   return  await bcrypr.compare(enteredpassword, this.password)  
}


userSchema.methods.getresetToken =  function(){
    const token =   crypto.randomBytes(20).toString('hex');
    // genrate hash reset token
    this.resetpasswordtoken =  crypto.createHash('sha256').update(token).digest('hex');
    //set token expire time
    this.resetpasswordtokenexpire = Date.now() + 30 * 60 * 1000;
    console.log("tasken  at getresettoken ---", token)  
    return token;
}

const usermodel = mongoose.model('user',userSchema);
module.exports = usermodel;