import { useEffect, useState } from "react"
import { forgetPassword , clearAuthError} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PasswordForget(){
    const dispatch = useDispatch();
const [email, setEmail] = useState("");
const { error , message } = useSelector(state =>state.authState)

const handleSubmit = (e) =>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email)
    dispatch(forgetPassword(formdata))
}

useEffect( () =>{
    if(message){
        toast(message, {
            type:'success',
            position :toast.POSITION.BOTTOM_CENTER
        })
        setEmail("");
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

},[message,error,dispatch])
    return(

		<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value= {email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>


    )
}