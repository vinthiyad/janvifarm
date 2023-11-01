import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile(){

    const {isAuthenticated , user}=useSelector(state =>state.authState)

      console.log("user ---->", user)
    return(
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user.avatar? user.avatar : '/images/login/Default_Avatar_Image.jpg'}  alt='' />
                </figure>
               <Link to="/profileupdate" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
               </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.email}</p>

                 <h4>Joined</h4>
                 <p>{String(user.createdat).substring(0,10)}</p>

                 <Link to ="/myorder"  className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>
                <Link to="/profilepasswordupdate" className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
    )
}