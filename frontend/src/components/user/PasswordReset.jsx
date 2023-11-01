import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordSuccess } from "../../slices/authSlice";
import { clearAuthError, resetPassword } from "../../actions/userActions";
import {useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";


export default function PasswordReset(){
    const {token} = useParams()
    console.log("token ---",token)
const dispatch = useDispatch();
const navigate = useNavigate();
const {isAuthenticated ,error} =useSelector(state => state.authState)
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmPassword] = useState("");

const handleSubmit= (e)=>{
    e.preventDefault();
    console.log("hanldesubmit at reset passwrod")
        const formdata = new FormData();
        formdata.append("password",password);
        formdata.append("confirmpassword",confirmpassword);
        dispatch(resetPassword(formdata ,token))  

}

useEffect( ()=>{
        if(isAuthenticated){
            toast("Password Reset Successfully", {
                type:'success',
                position :toast.POSITION.BOTTOM_CENTER
            })
             navigate("/")   
             return;
        }
        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }


},[error, isAuthenticated,dispatch,navigate])   

    return(
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form onSubmit={handleSubmit} className="shadow-lg">
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_password_field">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password_field"
                        className="form-control"
                        value={confirmpassword}
                        onChange={(e) =>setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    id="new_password_button"
                    type="submit"
                    className="btn btn-block py-3">
                    Set Password
                </button>

            </form>
        </div>
    </div>


    )
}