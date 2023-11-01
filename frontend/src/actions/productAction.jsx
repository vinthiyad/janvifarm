import axios from 'axios'; 
import { productRequest , productSuccess ,productFail, } from '../slices/productSlice';      


export const  getProduct = id => async (dispatch) =>{           
    try{
        dispatch(productRequest())
    const {data} = await axios.get(`/api/v1/product/${id}/`)
    console.log("data---",data);      
    dispatch(productSuccess(data))   
    }
    catch(error){   
        dispatch(productFail(error.response.data.message))
    }   
}