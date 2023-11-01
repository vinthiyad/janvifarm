import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name:"products",
    initialState:{
        loading: false
        
        
    },
    reducers:{
        productsRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        productsSuccess(state,action){  
           
            return{
                ...state,
                loading: false,
                products : action.payload.products,
                productsCount : action.payload.count,
                productPerPage :  action.payload.productPerPage
            }
        },
        productsFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminProductsRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        adminProductsSuccess(state,action){  
           
            return{
                ...state,
                loading: false,
                products : action.payload.products
             
            }
        },
        adminProductsFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error: null
            }
        }
    }
});  


const {actions,reducer} = productsSlice;  

export const {productsRequest,
    productsSuccess,
    productsFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail,
    clearError   
  } = actions;
export default reducer;