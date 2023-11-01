import axios from 'axios'; 
import { productsRequest, productsSuccess, productsFail, adminProductsRequest, adminProductsFail, adminProductsSuccess
      } from '../slices/productsSlice';
import { createReviewRequest,
        createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail } from '../slices/productSlice';
export const getProducts = (keyword,category ,price,ratings,currentPage) => async (dispatch) => {
    console.log("kewword -->", keyword , "--cureentpage --",currentPage ,"price --",price
    )
    try{
        dispatch(productsRequest())  
        let link = `/api/v1/products?page=${currentPage}`;
        if(keyword){
            link +=`&keyword=${keyword}`  
        }
        if(category){
            link +=`&category=${category}`   
        }
        /* if(price){
            link +=`&price=${price}` 
            //  link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`  
        } */
        if(ratings){
            link +=`&ratings=${ratings}`
        }
    const {data} = await axios.get(link)  
     dispatch(productsSuccess(data))  
     console.log("@ products success -- data ",data)
    }
    catch(error){
        dispatch(productsFail(error.response.data.message))
    }
}
   
 export const createReview = (reviewData) => async (dispatch) => {     
   console.log("@ create review -->" , reviewData.get("comment"),"===prodcut id --", 
   reviewData.get("productid")  , "-- rating --" , reviewData.get("rating")
   )

 try {
    console.log("55555555555555555")
     /* dispatch(createReviewRequest()) 
        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        } */
        dispatch(createReviewRequest()) 
        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        }
        console.log("2222222222222222")
       const {data} =  await axios.put("/api/v1/review" , reviewData ,config)
        dispatch(createReviewSuccess(data));
        console.log("33333333333333333333")
    
 } catch (error) {
    dispatch(createReviewFail(error.response.data.message))
 }
} 


//get admin products   


export const getadminProducts = async (dispatch) => {
        console.log("@  getadminProducts  ")
   
    try{
        dispatch(adminProductsRequest())  
             
        const {data} = await axios.get("/api/v1/admin/products")  
        console.log(" data get admin products -- >",data)
        dispatch(adminProductsSuccess(data))
    }
    catch(error){
        dispatch(adminProductsFail(error.response.data.message))
    }
}

export const createNewProducts = (productData) => async (dispatch) => {
    

try{
    dispatch(newProductRequest())   
       
    const {data} = await axios.post("/api/v1/admin/product/new" , productData )  
    dispatch(newProductSuccess(data))
}
catch(error){
    dispatch(newProductFail(error.response.data.message))
}
}

export const deleteProduct = (id) => async (dispatch) => {
    

    try{
        dispatch(deleteProductRequest())   
           
      await axios.delete(`/api/v1/admin/product/${id}` )  
        dispatch(deleteProductSuccess())
    }
    catch(error){
        dispatch(deleteProductFail(error.response.data.message))
    }
    }


    export const updateProduct = (id , productData) => async (dispatch) => {
    

        try{
            dispatch(updateProductRequest())   
               
            const {data} = await axios.put(`/api/v1/admin/product/${id}` , productData )  
            dispatch(updateProductSuccess(data))
        }
        catch(error){
            dispatch(updateProductFail(error.response.data.message))
        }
        }


