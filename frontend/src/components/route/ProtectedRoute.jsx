import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader";

export default function ProtectedRoute({children ,isAdmin}){
    const {isAuthenticated , loading ,user } = useSelector(state => state.authState);

    console.log("@ protected Route --> authenicated --",isAuthenticated,"--- loading --",loading)
       
    if(!isAuthenticated &&  !loading) {    
       return <Navigate to="/login" />  
    }
    if(isAuthenticated){
        if(isAdmin === true && user.role !== 'admin'){
            return <Navigate to="/login" />  
       
        }
        return children ;
    }
    if(loading){   
        return <Loader/> ;
    }

}