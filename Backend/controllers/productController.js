const Product = require('../models/productmodel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');



// Get All Products - /api/v1/products
exports.getProducts = async(req,res,next) => {
   const productPerPage = 3;   
   //paginate(productPerPage);
  // const apifeatures =  new APIFeatures(Product.find(),req.query).search().filter().paginate(productPerPage);
   let buildQuery = () =>{
      return new APIFeatures(Product.find(),req.query).search().filter()         
   }  
   const filteredProductsCount = await buildQuery().query.countDocuments();  
   const totalProductsCount  = await Product.countDocuments();
   let productsCount  = totalProductsCount;

   if(filteredProductsCount != totalProductsCount){
      productsCount = filteredProductsCount;
   }
   //const products = await apifeatures.query; 
   const products = await buildQuery().paginate(productPerPage).query;  
  
   /* THIS IS SET IMEOUT TO TEST THE LOADER */  
      //await new Promise(resolve => setTimeout(resolve,3000))
      /* THIS IS SET IMEOUT TO TEST THE LOADER */
    
    
     //return next(new ErrorHandler("UNABLE TO ", 400))
     
     res.status(200).json({
        success : true,
        productPerPage,
        count: productsCount,        
        products
         })

}  

// Get Single Product- ap1/v1/product/id:  id comes here
exports.getsingleProduct =  catchAsyncError(async (req, res, next) => {
   const product     =  await  Product.findById(req.params.id);
      if(!product){
      return next( new ErrorHandler('Prodcut Not Found', 400));
      }
   //     await new Promise(resolve => setTimeout(resolve,3000))
      res.status(200).json({
         success : true,
         product  
      })
})


// Create New Product - /api/v1/product/new
exports.newProduct = catchAsyncError ( async(req,res,next) => {
   console.log("req.body--")
   let images = [];

   let BASE_URL = process.env.BACKEND_URL;
   if(process.env.NODE_ENV === "production"){
       BASE_URL = `${req.protocol}://${req.get('host')}`
   }
   if(req.files.length >0 ){
      req.files.forEach( file =>{
         let url = `${BASE_URL}/upload/product/${file.originalname}`
         images.push({filename : url})
      })
   }

   req.body.images = images;
   
   req.body.user = req.user.id;
   const product = await Product.create(req.body);
   res.status(201).json({
    success:true,
    product       
   }) 
}
)

// Update Product  admin - api/v1/product/id:  id comes here

exports.updateProduct = async (req, res, next) => {
   let product     =  await  Product.findById(req.params.id);
   console.log("UPDATE PRODUCT  req.body.imagesclear  =----",req.body.imagesclear)
   let images = [];
   if(req.body.imagesclear === false){   
      images = product.images;
   }


   let BASE_URL = process.env.BACKEND_URL;
   if(process.env.NODE_ENV === "production"){
       BASE_URL = `${req.protocol}://${req.get('host')}`
   }

   console.log("req.files.   -->",req.files ,"req.files. length -->",req.files.length)
   if(req.files.length >0 ){
      req.files.forEach( file =>{
         let url = `${BASE_URL}/upload/product/${file.originalname}`
         images.push({filename : url})
      })
   }

   req.body.images = images;

   if(!product){
     return  res.status(404).json({
         success : false,
         message: "Product Not Found"
   })
   }

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {

         new : true,
         runValidators : true
    })

    res.status(201).json({
      success : true ,
      product
    })

}
// Delete Product admin can only delete  - api/v1/product/id:  id comes here
exports.deleteProduct = async (req, res, next) => {
     
   const product     =  await  Product.findById(req.params.id);
   if(!product){
     return  res.status(404).json({
         success : false,
         message: "Product Not Found"
   })
   }
   await Product.findByIdAndDelete(req.params.id)
   res.status(200).json({
      success:true,
      message: " Product Deleted Successfully"
   })

}  

// Create Review // /api/v1/review

exports.createReview = ( async(req,res, next) =>{
   const {productid, comment, rating} = req.body;
   const review = {
      user : req.user.id,
      rating,
      comment
   }  
   console.log("111111111111111111111111111111")
   const product = await Product.findById(productid);
   // inf user reives exits 
 
   const isReviewed = product.reviews.find(review => 
      { 
        return  (review.user.toString() == req.user.id.toString());
      })
    
      if(isReviewed){
         console.log(" if  --", isReviewed)
         product.reviews.forEach(review =>{
            if(review.user.toString() == req.user.id.toString()){
               review.comment = comment;
               review.rating = rating;      
            }
         })
      }else{
         // create revie
         console.log(" else  --", isReviewed)
         product.reviews.push(review);
         product.numofReviews = product.reviews.length;

      }
      // find avaragew of th e product reviews 
      product.ratings = product.reviews.reduce((acc ,review) => {
         return review.rating + acc ;
      }  ,0) / product.reviews.length ;
      product.ratings = isNaN(product.ratings) ? 0: product.ratings;
   
      await product.save({validateBeforeSave: false})

      res.status(200).json({  
         success : true
      })
})

// Get REivews  /api/v1/reviews  id - productid  is query parameter
// api/v1/reviews?id=
exports.getReviews = ( async(req,res, next) =>{
   const product = await Product.findById(req.query.id).populate('reviews.user' , 'name email' )
   res.status(200).json({
      success: true,
      reviews : product.reviews        
   })

})

// Delete REview  / api/v1/review - delete request

exports.deleteReviews = ( async(req,res, next) =>{   
   const product = await Product.findById(req.query.productid);
   // filter the reviews which does not match the delete review  id
  const reviews =  product.reviews.filter(review => {
      return review._id.toString() !== req.query.id.toString()  })

      numofReviews = reviews.length;

      // find the average 
      let ratings = reviews.reduce((acc, review) =>{
            return acc+review.rating ;
      } , 0) / reviews.length;

      ratings = isNaN(ratings)? 0 : ratings;
    
      //save product reviews

        await Product.findByIdAndUpdate(req.query.productid , {
         numofReviews,
         ratings,
         reviews
         
        })

        res.status(200).json({
         success : true
        })

})

// get admin products  api/v1/admin/products

exports.getAdminProducts = ( async(req,res, next) =>{ 

   const products = await Product.find();
   res.status(200).json({
      success: true,
      products
    } )
})

