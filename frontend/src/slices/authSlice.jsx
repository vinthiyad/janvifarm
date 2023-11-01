import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"auth",
    initialState:{   
        loading: true, 
        isAuthenticated: false    
    },
    reducers:{
        loginRequest(state,action){
            return {
                ...state,
                loading:true,
              
            }
        },
        loginSuccess(state,action){  
           
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user : action.payload.User
                  
            }
        },
        loginFail(state,action){  
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
        },
        registerRequest(state,action){  
            return{
                /*loading: false,
                isAuthenticated: true, */
                ...state,
                loading: true
                }
        },
        registerSuccess(state,action){  
            return{
                ...state,
                loading:false,
                isAuthenticated: true,
                user:action.payload.User
            }
        },
        registerFail(state,action){  
            return{
                ...state,
                loading:false,
                error:action.payload    
            }
        },
        loadUserRequest(state,action){  
            return{
                ...state,
                loading: true,
                isAuthenticated: false
                }
        },
        loadUserSuccess(state,action){  
            return{
                ...state,
                loading:false,
                isAuthenticated: true,
                user:action.payload.User
            }
        },
        loadUserFail(state,action){  
            return{
                ...state,  
                loading:false,
                   
            }
        },
        logoutSuccess(state,action){  
            return{
                ...state,
                loading:false,
                isAuthenticated: false    
                
            }
        },
        logoutFail(state,action){  
            return{
                ...state,
                error:action.payload     
            }
        },
        updateProfileRequest(state,action){    
            return{
                ...state,
                loading: true,
                isUpdated : false
                
                }
        },
        updateProfileSuccess(state,action){  
            return{
                ...state,
                loading: false,      
                user:action.payload.User,  
                isUpdated : true
            }
        },
        updateProfileFail(state,action){  
            return{
                ...state,
                loading:false,
                error:action.payload    
            }
        },
        clearUpdateProfile(state, action){
            return {
                ...state,
                isUpdated: false  
            }
        },
        updatePasswordRequest(state,action){    
            return{
                ...state,
                loading: true,
                isUpdated : false
                
                }
        },
        updatePasswordSuccess(state,action){  
            return{
                ...state,
                loading: false,      
                isUpdated : true
            }
        },
        updatePasswordFail(state,action){  
            return{
                ...state,
                loading:false,
                error:action.payload    
            }
        },
        forgetPasswordRequest(state,action){    
            return{
                ...state,
                loading: true,
                message : null
               
                
                }
        },
        forgetPasswordSuccess(state,action){  
            return{
                ...state,
                loading: false,      
                message:action.payload.message
            }
        },
        forgetPasswordFail(state,action){  
            return{
                ...state,
                loading:false,
                error:action.payload    
            }
        },
        resetPasswordRequest(state,action){    
            return{
                ...state,
                loading: true
               
                
                }
        },
        resetPasswordSuccess(state,action){  
            return{
                ...state,
                loading: false,      
                isAuthenticated:true,
                user :action.payload.User
            }
        },
        resetPasswordFail(state,action){  
            return{
                ...state,
                loading:false,
                error:action.payload    
            }
        }
    }
});


const {actions,reducer} = authSlice;

export const {loginRequest,
                loginSuccess,
                loginFail, 
                clearError,
                registerFail,
                registerSuccess,
                registerRequest,
                loadUserFail,
                loadUserRequest,
                loadUserSuccess,
                logoutSuccess,
                logoutFail,
                updateProfileRequest,
                updateProfileSuccess,
                updateProfileFail,
                clearUpdateProfile,
                updatePasswordRequest,
                updatePasswordSuccess,
                updatePasswordFail,
                forgetPasswordRequest,
                forgetPasswordSuccess,
                forgetPasswordFail,
                resetPasswordRequest,
                resetPasswordSuccess,
                resetPasswordFail} = actions;
export default reducer;  