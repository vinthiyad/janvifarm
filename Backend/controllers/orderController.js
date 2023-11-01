const catchAsyncError = require("../middleware/catchAsyncError");
const order = require('../models/ordermodel' );
const Product = require('../models/productmodel');
const ErrorHandler = require("../utils/errorHandler");


// create new order - api/v1/order/new
exports.newOrder = catchAsyncError( async(req,res,next) =>{  
    console.log("**************************")  
    const {
        orderitems,
        shippinginfo,
        itemsprice,
        taxprice,
        shippingprice,
        totalprice,
        paymentinfo
    }   = req.body;
    console.log("req.user.id --->",req.user.id)
    
 const Order = await  order.create({
    orderitems,
    shippinginfo,
    itemsprice,
    taxprice,
    shippingprice,
    totalprice,
    paymentinfo,
    paidat: Date.now(),
    user:req.user.id
});

    res.status(200).json({
        success:true,  
        Order
    })   
})

// Display Single Order - api/v1/order/id
exports.getSingleOrder = catchAsyncError( async (req,res,next) =>{
    const Order = await order.findById(req.params.id).populate('user' , 'name email');
    if(!Order) {
        return next(new ErrorHandler(`Order Not Found with this id ${req.params.id}` , 400))
    }
    res.status(200).json({
        success: true,
        Order
    })





} )

// Get Logged In User Orders
exports.getMyOrder = catchAsyncError( async (req,res,next) =>{

    const Orders = await order.find({user:req.user.id});

    if(!Orders) {  
        return next(new ErrorHandler(`Order Not Found with this id ${req.params.id}` , 400))
    }  
    res.status(200).json({
        success: true,
        Orders
    })

} )

//Admin : Get All Orders - 
exports.orders = catchAsyncError( async (req,res,next) =>{  
    const Orders = await order.find();
     let totalamount = 0;
     Orders.forEach(order => {
        totalamount += order.totalprice;
     });
    res.status(200).json({
        success: true,
        totalamount,
        Orders
    })

} )

// Admin - Update Order , quantity , stock , and status change 

exports.updateorders = catchAsyncError( async (req,res,next) =>{
    const Order = await order.findById(req.params.id);
    console.log("@ admin update order -Order ->" , Order)
   /*  if(Order.orderstatus == 'Delivered'){
        return next(new ErrorHandler("Delivered ORders"))
    }
   
    //update product stock 
    Order.orderitems.forEach(async (orderitem)  =>{
            await updatestock(orderitem.product, orderitem.quantity)
    }) */
    console.log("req.body----->",req.body)
    console.log("req.body.orderstatus----->",req.body.orderstatus)
    Order.orderstatus = req.body.orderstatus;

    Order.deliveredat = Date.now();
  
    await Order.save();

    res.status(200).json({
        success: true,

        
    })

} )

async function updatestock(productid, quantity){
    const product = await Product.findById(productid)
    product.stock = product.stock -  quantity;
    await product.save({validateBeforeSave :false})
}

// Admin - Delete Order

exports.deleteorders = catchAsyncError( async (req,res,next) =>{
  
   // const Order = await order.findById(req.params.id);
   await  order.findByIdAndDelete(req.params.id)   
   console.log("DELETED")
//if(!Order) {
   //     return next(new ErrorHandler(`Order Not Found with this id ${req.params.id}` , 400))
//}
//await Order.remove();  
    res.status(200).json({
        success: true, 
        
    })


});