const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    shippinginfo :{
        address: {
            type: String,
            required : true   
        },
        country: {
            type: String,
            required : true
        },
        city: {
            type: String,
            required : true
        },
        phoneno: {
            type: String,
            required : true
        },
        postalcode: {
            type: String,
            required : true
        }


    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    orderitems :[{
      name:{
          type: String,
          required : true  
      },
    quantity:{
            type: Number,
            required : true  
        },
    image:{
            type: String,
            required : true  
        },
    price:{
            type: Number,
            required : true  
        },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'product'    
    }
}],
    itemsprice:{
        type: Number,
        required : true,
        default: 0.0

    },
    taxprice:{
        type: Number,
        required : true,
        default: 0.0

    },
    shippingprice:{
        type: Number,
        required : true,
        default: 0.0

    },
    totalprice:{
        type: Number,
        required : true,
        default: 0.0

    },
    paymentinfo: {
        paymentid: {
            type: String,
            required: true
        },
        orderid: {
            type: String,
            required: true
        },
        status:{
        type: String,
            required: true
        }

    },

    paidat:{
        type: Date,
    },
    deliveredat:{
        type: Date,
    },
    orderstatus : {
        type: String,
        required:true,
        default : "processing"
    },
    createdat: {
        type: Date,
        default : Date.now
    }
})


let ordermodel = mongoose.model('Order',orderSchema);

module.exports = ordermodel;