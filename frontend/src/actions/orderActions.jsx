import axios from "axios";
import { adDeleteOrderFail, adDeleteOrderRequest, adDeleteOrderSuccess, adUpdateOrderFail, adUpdateOrderRequest, adUpdateOrderSuccess, adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, 
         createOrderRequest,
         createOrderSuccess,
         orderDetailFail,
         orderDetailRequest,
         orderDetailSuccess,
         userOrdersFail,
         userOrdersRequest,
         userOrdersSuccess,
         } from "../slices/orderSlice"

export const createOrder = (order)  =>async(dispatch) =>{
    console.log("order -->", order)
    try {   
        dispatch(createOrderRequest());
        const {data} = await axios.post("/api/v1/order/new" , order)  
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.resonse.data.message))
    }
}
export const userorders = async(dispatch) =>{  
    
    try {   
        dispatch(userOrdersRequest());
        const {data} = await axios.get("/api/v1/myorder" )  
        dispatch(userOrdersSuccess(data));
    } catch (error) {
        dispatch(userOrdersFail(error.resonse.data.message))
    }
}
export const orderDetail = (id) => async (dispatch) =>{  
    
    try {   
        dispatch(orderDetailRequest());
        const {data} = await axios.get(`/api/v1/order/${id}` )  
        dispatch(orderDetailSuccess(data));
    } catch (error) {
        dispatch(orderDetailFail(error.resonse.data.message))  
    }
}
export const adminorders = () => async(dispatch) =>{  
    
    try {   
        dispatch(adminOrdersRequest());
        const {data} = await axios.get("/api/v1/admin/orders" )  
        dispatch(adminOrdersSuccess(data));
    } catch (error) {
        dispatch(adminOrdersFail(error.resonse.data.message)) 
    }
}
export const admindeleteorder = (id) => async(dispatch) =>{  
    
    try {   
        dispatch(adDeleteOrderRequest());
        await axios.delete(`/api/v1/admin/${id}` )    
        dispatch(adDeleteOrderSuccess());  
    } catch (error) {
        dispatch(adDeleteOrderFail(error.resonse.data.message))
    }
}   
export const adminupdateorder = (id ,orderdata) => async(dispatch) =>{  
    console.log("@ admjn updata "  , orderdata)     
    try {   
        dispatch(adUpdateOrderRequest());
        const {data} = await axios.put(`/api/v1/admin/${id}`  ,orderdata)  
        dispatch(adUpdateOrderSuccess(data));
    } catch (error) {
        dispatch(adUpdateOrderFail(error.resonse.data.message))   
    }
}