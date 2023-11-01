import { Fragment, useEffect, useState } from "react";
import {useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'; 
import { clearAuthError, register } from "../../actions/userActions";
import { toast } from "react-toastify";


export default function Register(){
const dispatch  = useDispatch();
const navigate = useNavigate();
const {error,isAuthenticated}  =useSelector(state => state.authState)
const [userData ,setUserData ]  = useState({
    name : "",
    email : "",
    password :""    

});    

const [avatar,setAvatar] =useState("");
const [previewAvatar, setPreviewAvatar] = useState("/images/login/Default_Avatar_Image.jpg");

const hanldeOnChange  = (e) =>{
  if(e.target.name === 'avatar'){  
    const filereader = new FileReader();
    filereader.onload = () => {
      if(filereader.readyState === 2){
        setPreviewAvatar(filereader.result)
        setAvatar(e.target.files[0])
      }
    }
    filereader.readAsDataURL(e.target.files[0])
  }else{
  setUserData({...userData, [e.target.name]:e.target.value })
  }
}

const handleSubmit = (e) =>{  
  e.preventDefault();
  const formData = new FormData();
  formData.append("name" , userData.name);
  formData.append("email" , userData.email);
  formData.append("password" , userData.password);
  formData.append("avatar" , avatar);
  dispatch(register(formData))
}
const isBtnEnable = (userData.email)&&(userData.password)&&(userData.name);  
useEffect(()=>{
  console.log("@ Register -isAuthenticated->" ,isAuthenticated)
  if(isAuthenticated)
  {
    navigate("/");
    
  }
  if(error){
    toast(error, {
          position: toast.POSITION.BOTTOM_CENTER,
          type:'error',
          onOpen:() =>{dispatch(clearAuthError)}      
    })
    return
  }   
      
} ,  [error, dispatch,navigate,isAuthenticated])  




return(
  <Fragment>
        <div className="row wrapper mt-3" >
		<div className="col-10 col-lg-5">
        <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" name='name'
             onChange={hanldeOnChange} id="name_field" 
             className="form-control"
               />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"   
                name='email' onChange={hanldeOnChange}
                className="form-control"
                
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>   
              <input
                type="password"
                id="password_field"
                name='password' onChange={hanldeOnChange}
                className="form-control"
                            />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>  
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={previewAvatar}
                              className='rounded-circle'
                              alt='Avatar'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          onChange={hanldeOnChange}
                          className='custom-file-input'
                          id='customFile'
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>     
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled = {!isBtnEnable}
            >
              REGISTER
            </button>
          </form>
		  </div>
         </div>
    </Fragment>


    )
}