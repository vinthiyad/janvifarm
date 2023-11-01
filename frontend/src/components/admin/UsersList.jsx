import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import {MDBDataTable} from 'mdbreact';
import Sidebar from "./Sidebar";
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import Loader from '../layout/Loader'

import { deleteUser, getUsers } from "../../actions/userActions";
import { clearUserDelete, clearUserError } from "../../slices/usersSlice";

export default function UsersList(){
    const {users, loading =true, error ,isUserDeleted} =useSelector(state => state.userState);      

    
    console.log("@ user list -->" , users)
    const dispatch = useDispatch();   
    const setUsers  = () =>{
        const data = {
            columns : [
                {
                    label:"ID",
                    field: "id",
                    sort: 'asc'
                },
                {
                    label:"Name",
                    field: "name",
                    sort: 'asc'
                },
                {
                    label:"Email",
                    field: "email",
                    sort: 'asc'
                },
                {
                    label:"Role",
                    field: "role",
                    sort: 'asc'
                },
                {
                    label:"Actions",
                    field: "actions",
                    sort: 'asc'
                }
            ],
            rows :[]
        }   
          users&& users.forEach(user =>{
            data.rows.push({
                id: user._id,
                name : user.name,
                email: user.email,
                role:user.role,
                actions : 
                <Fragment>
                    <Link to={`/admin/user/${user._id}` }>  
                        <i className="fa fa-pencil px-4 py-1"></i>
                    </Link>
                    <button onClick={ (e) => handleDelete (e , user._id)} className="btn btn-danger px-2 py-1">
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })

            
           })

        return data;           
                
    }

const handleDelete = (e , id) =>{
    e.target.disabled = true;
    dispatch(deleteUser(id));  

}
useEffect( ()=>{
    if(error ){
        toast( (error ) ,{
           type:"error",
           position : toast.POSITION.BOTTOM_CENTER,
           onOpen: ()=> {dispatch(clearUserError())}
        })
        return;
    }
    if(isUserDeleted){
        toast("User Deleted Successfully" ,{
            type:"success",
            position : toast.POSITION.BOTTOM_CENTER,
            onOpen: ()=> {dispatch(clearUserDelete())}   
         })
         return;
    }
    dispatch(getUsers())

}, [dispatch, error ,isUserDeleted]);   

    return(

        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
        <div className="col-12 col-md-10">
          <div className="col-12 col-md-10">
                <h1 className="my-4">Product List</h1>  
                    <Fragment>
                    {loading ? <Loader/> :
                   
                    <MDBDataTable 
                        data = {setUsers()}   
                        bordered
                        striped
                        hover
                        responsive
                    />
                    }    
                    </Fragment>  
            </div>
        </div>


        </div>

    )
}