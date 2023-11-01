import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";   


import {toast } from 'react-toastify';
import { getUser, updateUser } from "../../actions/userActions";
import { clearUserError, clearUserUpdate } from "../../slices/usersSlice";
 



export default function UpdateUser(){
    const [name,setName ]= useState("");
    const [email,setEmail ] = useState("");
    const [role,setRole] = useState("");

    const {id } = useParams();
    
    const {user,  error ,isUserUpdated} =useSelector(state => state.userState);

    const navigate = useNavigate();
    const dispatch = useDispatch();

     

const handleSubmit = (e) => {
  e.preventDefault();
  
  const formdata = new FormData();  
  
  formdata.append("name" ,name);
  formdata.append("email" ,email);
  formdata.append("role" ,role);

 
  dispatch(updateUser(id,formdata)); 
  
}

useEffect( () =>{
  if(isUserUpdated) {
    toast ("User Updated Successfully" , {   
       type: 'success',
       position : toast.POSITION.BOTTOM_CENTER,
       onOpen : () => dispatch(clearUserUpdate())  
    })
   
    navigate("/admin/users");
    return;
  }

  if(error) {
    toast (error , {
       type: 'error',
       position : toast.POSITION.BOTTOM_CENTER,
       onOpen : () => dispatch(clearUserError())  
    })

    return;
  }
dispatch(getUser(id));   

},[isUserUpdated,error,dispatch])

useEffect( () =>{
    if(user._id){
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
   }
}, [user])

    return(

        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>
        <div className="col-12 col-md-10">
        <div className="col-12 col-md-10">
            
        <div className="wrapper my-2" > 
        <form className="shadow-lg"  onSubmit={handleSubmit}>
            <h1 className="mb-4">Update User 
            </h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                onChange={ (e) =>setName(e.target.value)}  
                value={name}
                required
              />
            </div>

           

              <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value= {email}
                onChange ={e =>setEmail(e.target.value)}
                required
              />
              </div>

              <div className="form-group">
              <label htmlFor="role_field">Role</label>
              <input
                type="role"
                id="role_field"
                className="form-control"
                value= {role}
                onChange ={e =>setRole(e.target.value)}
                required
              />
              </div>
          
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              UPDATE 
            </button>

          

          </form>
        </div>
        </div>
    </div>


    </div>

       

    )
}

