import { Fragment, useEffect, useState } from "react";
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "../../actions/userActions";
import {toast} from 'react-toastify';
import {Link, useLocation, useNavigate} from 'react-router-dom';


export default function Login(){

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
console.log("firstvvv " ,location.search.split('=')[0] , " --second--",location.search.split('=')[1] )  
const redirectURL = location.search?'/'+location.search.split('=')[1]:'/'
 const  {loading ,error, isAuthenticated} = useSelector(state =>state.authState);
 
 const isBtnEnable = (email)&&(password);  
 
   
const handleLoginSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(email,password));   
}

useEffect( ()=>{
  console.log("@ LOGIN USEEFFECT ----> isAuthenticated --->", isAuthenticated)
  if(isAuthenticated){  
    navigate(redirectURL)  
  }
  if(error){
    toast(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type:'error',
          onOpen:() =>{dispatch(clearAuthError)}    
    })
    return  
  }
} ,[error,isAuthenticated,navigate,dispatch])  

    return (  

        <Fragment>
        <MetaData title={'Login-JanviFarm'}/>
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleLoginSubmit}> 
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value= {email}
                onChange ={e =>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value= {password}
                onChange ={e =>setPassword(e.target.value)}
              />
            </div>  

            <Link  to="/password/forget" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={!isBtnEnable}
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form> 
		  </div>
        </div>
    </Fragment>  




    )
}