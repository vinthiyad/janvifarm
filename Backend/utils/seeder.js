const products = require("../data/productsdata.json");
const Product = require('../models/productmodel');
const dotenv = require('dotenv');
const connectDatabase = require('../config/databse');



dotenv.config({path:'Backend/config/config.env'});
connectDatabase();



const seedProduct = async() =>{
    try{
    await Product.deleteMany();
    console.log("Products Deleted");
    await Product.insertMany(products);   
    console.log("Products Addded");
    }catch(error){
        console.log(error.message);
    }
    process.exit();
}
seedProduct();
