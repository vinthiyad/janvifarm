import { createSlice } from "@reduxjs/toolkit";     


const orderSlice = createSlice({    
    name:"order",
    initialState:{
        orderDetail : {},
        userOrders : [],
        adminOrders  : [],
        isOrderDeleted : false,
        isOrderUpdated : false,
        loading : false
    },     
   
    reducers:{
            createOrderRequest(state,action){
                return{
                    ...state,
                    loading:true
                    
                }
            },
            createOrderSuccess(state,action){
                return{
                    ...state,
                    loading:false,
                    orderDetail:action.payload.Order
                }
            },
            createOrderFail(state,action){
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            },
            userOrdersRequest(state,action){
                return{
                    ...state,
                    loading:true
                  
                }
            },
            userOrdersSuccess(state,action){
                return{
                    ...state,
                    loading:false,
                   
                    userOrders:action.payload.Orders   
                }
            },
            userOrdersFail(state,action){
                return{
                    ...state,
                    loading:false,
                  
                    error:action.payload
                }
            },
            orderDetailRequest(state,action){
                return{
                    ...state,
                    loading:true
                   
                }
            },
            orderDetailSuccess(state,action){
                return{
                    ...state,
                    loading:false,
                    
                    orderDetail :action.payload.Order   
                }
            },
            orderDetailFail(state,action){
                return{
                     ...state,
                    loading:false,
                   
                    error:action.payload
                }
            },
            adminOrdersRequest(state,action){
                return{
                    ...state,
                    loading:true
                  
                }
            },
            adminOrdersSuccess(state,action){
                return{
                    ...state,
                    loading:false,
                    adminOrders:action.payload.Orders   
                }
            },
            adminOrdersFail(state,action){
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            },
            adDeleteOrderRequest(state,action){
                return{
                    ...state,
                    loading:true
                    
                }
            },
            adDeleteOrderSuccess(state,action){
                return{
                    ...state,
                    loading:false,
                    isOrderDeleted : true
                }
            },
            adDeleteOrderFail(state,action){
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            },
            adUpdateOrderRequest(state,action){
                return{
                    ...state,
                    loading:true
                    
                }
            },
            adUpdateOrderSuccess(state,action){
                return{
                    ...state,
                    loading:false,
                    isOrderUpdated : true
                }
            },
            adUpdateOrderFail(state,action){
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
            },
            clearAdminUpdateOrder(state,action){
                return{
                    ...state,
                    isOrderUpdated : false
                }
            },
            clearAdminDeleteOrder(state,action){
                return{
                    ...state,
                    isOrderDeleted : false   
                }
            },
            clearOrderError(state,action){
                return{
                    ...state,
                    error: null
                }
            },

           


    }
});


const {actions,reducer} = orderSlice;

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFail,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    adminOrdersFail,
    adDeleteOrderRequest,
    adDeleteOrderSuccess,
    adDeleteOrderFail,
    clearAdminDeleteOrder,
    adUpdateOrderRequest,
    adUpdateOrderSuccess,
    adUpdateOrderFail,
    clearAdminUpdateOrder,
    clearOrderError} = actions;
export default reducer;