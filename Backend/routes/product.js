const express = require('express');
const multer = require('multer');
const path = require('path')  ;
const { getProducts, newProduct, getsingleProduct,
     updateProduct, deleteProduct, createReview, getReviews, deleteReviews, getAdminProducts } = require('../controllers/productController');
const router =  express.Router();
const {isAuthenticatedUser, authorizationRoles} = require("../middleware/authenticate");   

const uploads = multer({storage: multer.diskStorage({
     destination: function(req,file,cb){
          cb(null,path.join(__dirname,'..','upload/product'))
     },
     filename:function(req,file,cb){
          cb(null,file.originalname)
     }
})  }) 


router.route('/products').get(getProducts);  

router.route('/product/:id')   
                            .get(getsingleProduct)     
                            
                            
router.route('/review').put(isAuthenticatedUser,createReview)
                       .delete(deleteReviews);                            
router.route('/reviews').get(getReviews);  

// Admin routes  
router.route('/admin/product/new').post(isAuthenticatedUser,authorizationRoles('admin'),uploads.array('images'),newProduct);
router.route('/admin/products').get(isAuthenticatedUser,authorizationRoles('admin'),getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizationRoles('admin'),deleteProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizationRoles('admin'),uploads.array('images'),updateProduct);




module.exports = router;    