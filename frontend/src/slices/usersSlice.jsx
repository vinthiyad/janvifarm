import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name:"users",
    initialState:{
        loading: false,
        user: {},
        users: [],
        isUserUpdated: false,
        isUserDeleted: false
        
        
    },
    reducers:{
        usersRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        usersSuccess(state,action){  
           
            return{
                ...state,
                loading: false,
                users : action.payload.Users,
                
               
            }
        },
        usersFail(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        userRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        userSuccess(state,action){  
           
            return{
                ...state,
                loading: false,
                user : action.payload.User,
               
            }
        },
        userFail(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        userDeleteRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        userDeleteSuccess(state,action){  
           
            return{
                ...state,
                loading: false,
                isUserDeleted :true,
               
            }
        },
        userDeleteFail(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        userUpdateRequest(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        userUpdateSuccess(state,action){  
           
            return{
                ...state,
                loading: false,
                isUserUpdated :true,
               
            }
        },
        userUpdateFail(state,action){
            return {
                ...state,
                loading:true,
            }
        },
        clearUserUpdate(state,action){
            return {
                ...state,
               isUserUpdated:false
            }
        },
        clearUserDelete(state,action){
            return {
                ...state,
               isUserDeleted:false,
            }
        },
        clearUserError(state,action){
            return{
                ...state,
                error: null
            }
        }
    }
});  


const {actions,reducer} = productsSlice;  

export const {productsRequest,
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    userDeleteRequest,
    userDeleteSuccess,
    userDeleteFail,
    userUpdateRequest,
    userUpdateSuccess,
    userUpdateFail,
    clearUserDelete,
    clearUserUpdate,
    clearUserError
  } = actions;
export default reducer;