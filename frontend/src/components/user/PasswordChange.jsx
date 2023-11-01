import { useEffect, useState } from "react"
import { updatePassword as PasswordAction ,clearAuthError } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PasswordChange(){
    const dispatch = useDispatch();
    const {isUpdated, error, loading} =useSelector(state =>state.authState)
    const [oldPassword , setOldPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");


const handleSubmit = (e)=> {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("oldpassword" ,oldPassword);
    formdata.append("password" ,newPassword);
    dispatch(PasswordAction(formdata));  
}

useEffect(()=>{
    if(isUpdated){
        toast("Password Changed Successfully",{
            type : "success",
            position:toast.POSITION.BOTTOM_CENTER,
            onOpen:() =>{dispatch(clearAuthError)}
        })
        setOldPassword("")
        setNewPassword("")
        return;
    }

    if(error){
        toast(error, {
              position: toast.POSITION.BOTTOM_CENTER,
              type:'error',
              onOpen:() =>{dispatch(clearAuthError)}      
        })
        return
      }  

},[error,dispatch,isUpdated])

    return(

        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit}  className="shadow-lg">
                <h1 className="mt-2 mb-5">Update Password</h1>
                <div className="form-group">
                    <label htmlFor="old_password_field">Old Password</label>
                    <input
                        type="password"
                        id="old_password_field"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="new_password_field">New Password</label>
                    <input
                        type="password"
                        id="new_password_field"
                        className="form-control"
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
            </form>
        </div>
    </div>



    )
}