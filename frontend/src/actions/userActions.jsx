import { loginRequest, loginSuccess,loginFail , clearError,
         registerFail,registerRequest,registerSuccess,
         loadUserFail,loadUserRequest,loadUserSuccess,
         logoutFail,logoutSuccess, updateProfileRequest,
         updateProfileSuccess, updateProfileFail,
         updatePasswordFail,updatePasswordRequest,updatePasswordSuccess ,
         forgetPasswordRequest,
         forgetPasswordSuccess,
         forgetPasswordFail,
         resetPasswordRequest,
         resetPasswordSuccess,
         resetPasswordFail  } from "../slices/authSlice";
import { 
        userDeleteFail, 
        userDeleteRequest,
        userDeleteSuccess,
        userUpdateFail, 
        userUpdateRequest,
        userUpdateSuccess, 
        usersFail, 
        usersRequest, 
        usersSuccess,
        userFail, 
        userRequest, 
        userSuccess  } from "../slices/usersSlice";

import axios from 'axios';

export const login = (email, password) => async (dispatch)  =>{
    try{
        dispatch(loginRequest());
    const {data} =    await axios.post("/api/v1/login",{email,password} );
    dispatch(loginSuccess(data));  
    }catch(error){
        dispatch(loginFail(error.response.data.message))   
    }

}

export const clearAuthError = (dispatch)=>{
    dispatch(clearError())
}

export const register = (userData) => async (dispatch)  =>{  
    try{
        dispatch(registerRequest());
        const config = {
            headers : {
                "Content-type" : "multipart/form-data"
                      }
                      }
                     
    const {data} =    await axios.post("/api/v1/register",userData ,config);   
    dispatch(registerSuccess(data));  
    }catch(error){
        dispatch(registerFail(error.response.data.message))
    }

}
export const loadUser = () => async (dispatch)  =>{  
    try{
        dispatch(loadUserRequest());
                            
    const {data} =    await axios.get("/api/v1/profile");   
    dispatch(loadUserSuccess(data));  
    }catch(error){
        dispatch(loadUserFail(error.response.data.message))
    }

}

export const logout = () => async (dispatch)  =>{       
    try{
    await axios.get("/api/v1/logout");   
    dispatch(logoutSuccess());  
    }catch(error){
        dispatch(logoutFail(error.response.data.message))    
    }

}

export const updateProfile = (userData) => async (dispatch)  =>{  
    console.log("update profile user actions --",userData.get("name"),userData.get("email"),userData.get("avatar"))
    try{
        dispatch(updateProfileRequest());
        const config = {
            headers : {
                "Content-type" : "multipart/form-data"
                      }
                      }
                      
    const {data} =    await axios.put("/api/v1/profile/update",userData ,config);   
    dispatch(updateProfileSuccess(data));  
    }catch(error){
        dispatch(updateProfileFail(error.response.data.message))
    }

}

export const updatePassword = (userData) => async (dispatch)  =>{  
    console.log("update password --",userData.get("oldPassword"),userData.get("newPassword"));
    try{
        dispatch(updatePasswordRequest());
        const config = {
            headers : {
                'Content-type': 'application/json'           
                      }
                      }
        
    await axios.put("/api/v1/password/change",userData,config);   
    dispatch(updatePasswordSuccess());  
    }catch(error){
        dispatch(updatePasswordFail(error.response.data.message))
    }

}

export const forgetPassword = (userData) => async (dispatch)  =>{  
    console.log("update password --",userData.get("oldPassword"),userData.get("newPassword"));
    try{
        dispatch(forgetPasswordRequest());
        const config = {
            headers : {
                'Content-type': 'application/json'           
                      }
                      }
        
    const {data} = await axios.post("/api/v1/password/forget",userData,config);   
    dispatch(forgetPasswordSuccess(data));  
    }catch(error){
        dispatch(forgetPasswordFail(error.response.data.message))
    }

}
export const resetPassword = (userData,token) => async (dispatch)  =>{  
    console.log("passreord -->",userData.get("password"), "Confirmpassword -->",userData.get("confirmpassword"))
    try{
        dispatch(resetPasswordRequest());
        const config = {
            headers : {
                'Content-type': 'application/json'           
                      }
                      }
                    
    const {data} = await axios.post(`/api/v1/password/reset/${token}`,userData,config);   
    dispatch(resetPasswordSuccess(data));  
    }catch(error){
        dispatch(resetPasswordFail(error.response.data.message))
    }

}

//get all users admin
export const getUsers = () => async (dispatch)  =>{   
    try{
        dispatch(usersRequest());
                              
    const {data} =    await axios.get("/api/v1/admin/users");
    console.log("@ user ACtion get -data->" ,data)   
    dispatch(usersSuccess(data));  
    }catch(error){
        dispatch(usersFail(error.response.data.message))
    }

}
//get single user admin
export const getUser = (id) => async (dispatch)  =>{   
    try{
        dispatch(userRequest());
                            
    const {data} =    await axios.get(`/api/v1/admin/user/${id}`);   
    dispatch(userSuccess(data));  
    }catch(error){
        dispatch(userFail(error.response.data.message))
    }

}
//get delete user admin
export const deleteUser = (id) => async (dispatch)  =>{   
    try{
        dispatch(userDeleteRequest());
                            
    const {data} =    await axios.delete(`/api/v1/admin/user/${id}`);     
    dispatch(userDeleteSuccess(data));  
    }catch(error){
        dispatch(userDeleteFail(error.response.data.message))
    }

}
//get update  user admin
export const updateUser = (id , userdata) => async (dispatch)  =>{   
    console.log("update id -->",userdata.get('id'),"update user email-->",userdata.get('email'),
    "update user -->",userdata.get('name'),"update user role-->",userdata.get('role'))
    try{
        dispatch(userUpdateRequest());      

        const config = {
            headers : { 
                'Content-type': 'application/json'    
                      }
                      }
                            
    const {data} =    await axios.put(`/api/v1/admin/user/${id}` ,userdata ,config);        
    dispatch(userUpdateSuccess(data));   // ('/admin/user/:id'
    }catch(error){
        dispatch(userUpdateFail(error.response.data.message))
    }

}