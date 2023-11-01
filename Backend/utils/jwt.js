const sendToken = (User, statuscode , res) =>{
    //create JWT Token
    const token = User.getJWToken();
    //setting cookies
    const options = {
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly:true,
    }  
    console.log("options -->",options )
    res.status(statuscode)
    .cookie('token', token, options)
    .json({
        success: true,
        User,
        token    
    })
}

module.exports = sendToken;