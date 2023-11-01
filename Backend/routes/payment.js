const express = require('express');
const { isAuthenticatedUser} = require("../middleware/authenticate"); 
const {paymentRazor}  = require("../controllers/paymentController");
/* const { processpayment, sendStripeAPI } = require('../controllers/paymentController'); */
const router =  express.Router();  

/* router.route("/payment/process").post(isAuthenticatedUser,processpayment);   
 router.route("/stripeapi").get(isAuthenticatedUser,sendStripeAPI);      */  

 router.route("/payment").post(isAuthenticatedUser,paymentRazor);    


module.exports = router;   