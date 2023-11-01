const express = require('express');
const router =  express.Router();  
const multer = require('multer');
const path = require('path')  ;

 const uploads = multer({storage: multer.diskStorage({
          destination: function(req,file,cb){
               cb(null,path.join(__dirname,'..','upload/user'))
          },
          filename:function(req,file,cb){
               cb(null,file.originalname)
          }
     })  }) 

 

const {registerUser,
     loginUser, 
     logoutUser, 
     forgetPassword,
     resetPassword,
     getUserProfile,
     passwordChange,
     profileUpdate,
     getAllUser,
     updateUser,
     deleteUser,
     getSingleUser} = require('../controllers/authController');

     const {isAuthenticatedUser, authorizationRoles} = require("../middleware/authenticate");   

router.route("/register").post(uploads.single('avatar') ,registerUser);  
     
router.route("/login").post(loginUser);     
router.route("/logout").get(logoutUser);  
router.route("/password/forget").post(forgetPassword);  
router.route("/password/reset/:token").post(resetPassword);  
router.route("/password/change").put(isAuthenticatedUser , passwordChange);  
router.route("/profile").get(isAuthenticatedUser , getUserProfile);    
router.route("/profile/update").put(isAuthenticatedUser ,uploads.single('avatar'), profileUpdate);    
//Admin Roles 
router.route('/admin/users').get(isAuthenticatedUser,authorizationRoles('admin'),getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizationRoles('admin'),getSingleUser)  
                               .put(isAuthenticatedUser,authorizationRoles('admin'),updateUser)
                               .delete(isAuthenticatedUser,authorizationRoles('admin'),deleteUser);


module.exports = router;                   