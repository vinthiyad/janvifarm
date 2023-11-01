const express = require('express');

const { newOrder, getSingleOrder, getMyOrder, orders, updateorders, deleteorders } = require('../controllers/orderController');
const {isAuthenticatedUser, authorizationRoles} = require("../middleware/authenticate");   
const router =  express.Router();


router.route("/order/new").post(isAuthenticatedUser,newOrder);  
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder)
router.route("/myorder").get(isAuthenticatedUser,getMyOrder);
//Admin Routes
router.route("/admin/orders").get(isAuthenticatedUser,authorizationRoles('admin'),orders);
router.route("/admin/:id").put(isAuthenticatedUser,authorizationRoles('admin'),updateorders)
                          .delete(isAuthenticatedUser,authorizationRoles('admin'),deleteorders);

module.exports = router;      