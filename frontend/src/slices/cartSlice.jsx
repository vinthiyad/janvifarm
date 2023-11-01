import { createSlice } from "@reduxjs/toolkit";     


const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')) :[],
        loading:false,
        shippingInfo : localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')): {}
    },     
   
    reducers:{
        addCartItemRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        addCartItemSuccess(state,action){  
            const item = action.payload;
            console.log("item ---"  , item  ,"item.product -->", item.product)
            const isItemExists = state.items.find(i => i.product === item.product )   
            console.log("isItemExists ---- " , isItemExists);
            if(isItemExists){
                state = { 
                        items : [...state.items.quantity ,item.quantity],
                        loading:false
                        }
            }else{
                state = {
                        items : [...state.items ,item],
                        loading:false
                        }
                localStorage.setItem("cartItems" , JSON.stringify(state.items));  
            }

            return state;
        },
        increaseItemQty(state,action){
            state.items = state.items.map(item => {
                if(item.product === action.payload){
                    item.quantity += 1;
                }
               
                return item;
            })
            localStorage.setItem("cartItems" , JSON.stringify(state.items)); 
        },
        decreaseItemQty(state,action){
            state.items = state.items.map(item => {
                if(item.product === action.payload){
                    item.quantity -= 1;
                }
                return item;
            })
            localStorage.setItem("cartItems" , JSON.stringify(state.items)); 
        },
        removeItemFromCart(state,action){
            const filterItems = state.items.filter(item =>{   
                return (item.product !== action.payload)})
            localStorage.setItem("cartItems" , JSON.stringify(filterItems));   
            return{
                ...state,
                items :filterItems
            }
        },
        saveShippingInfo(state,action){
            localStorage.setItem("shippingInfo" , JSON.stringify(action.payload));   
            return{
                ...state,
                shippingInfo : action.payload

            }
        },
        orderCompleted(state,action){
            localStorage.removeItem("shippingInfo");   
            localStorage.removeItem("cartItems");   
            sessionStorage.removeItem("orderInfo")
           
            return{
                items: [],
                loading:false,
                shippingInfo :  {}

            }
        }
        
    }
});


const {actions,reducer} = cartSlice;

export const {
    addCartItemRequest,
    addCartItemSuccess,
    increaseItemQty,
    decreaseItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted} = actions;
export default reducer;