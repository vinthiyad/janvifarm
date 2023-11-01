const catchAsyncError = require("../middleware/catchAsyncError");
const crypto = require("crypto");

const razorPay = require("razorpay");


//  /api/v1/payment 

exports.paymentRazor = catchAsyncError( async (req,res,next) =>{ 

    const razorpay = new razorPay({
        key_id: process.env.RAZOR_KEY_ID,
        key_secret:process.env.RAZOR_KEY_SECRET  
        });
    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "jjjvvvv12",
        payment_capture: 1
    };
    const order =  await razorpay.orders.create(options);
       res.status(200).json({
        success: true,
        order
       })
})

/* exports.processpayment = catchAsyncError( async(req,res,next) =>{
    const paymentIntent = await stripe.paymentIntents.create(      
        {
             amount:req.body.amount,
             currency : "usd",
             description : "Janvi Farm",
             metadata : {intergration_check : "accept_payment"}, 
             shipping : req.body.shipping
        }
    )

    res.status(200).json({
        success:true,
        client_secret : paymentIntent.client_secret

    })

})


exports.sendStripeAPI = catchAsyncError( async(req,res,next) =>{
     
    res.status(200).json({
       stripeAPIkey : process.env.STRIPE_API_PUB_KEY  

    })

}) */