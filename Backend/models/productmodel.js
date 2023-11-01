const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter Product Name"],
        trim:true,
        maxLength:[100, "Product Name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        required : true,
    },
    description:{
        type:String,
        required : [true, "Please Enter Product Description"]
    },
    ratings : {
        type : String,
        default : 0 
    },
    images:[
        { filename:
            {
            type :String,
            required:true
            }
        } 
    ],
    category:{
        type:String,
        required:[true ,"Please enter Product Category"],
        enum:{
            values:[
                'Fish',
                'Vegetables',
                'Spices', 
                'Fruits',
                'Diary/Products',
                'Meat',
                'Poultry/ Products'
            ],
            message:"Please Select Correct Category"
        }
    },

    seller:{
        type:String,
        required:[true,"Enter Product Seller"]   
    },
    stock:{
        type:Number,
        required:[true ,"Enter Product Stock"],
        maxLength:[20, "Product cannot exceed 20"],
    },
    numofReviews:{
        type:Number,
        default : 0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            rating:{
                type:String,
                required :true
            },
            comment:{
                type:String,
                required:true
                 
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }

})

let productmodel = mongoose.model('product',productSchema);    

module.exports = productmodel;
