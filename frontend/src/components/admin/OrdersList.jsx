import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearOrderError ,clearAdminDeleteOrder } from "../../slices/orderSlice"; 

import {MDBDataTable} from 'mdbreact';
import Sidebar from "./Sidebar";
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import Loader from '../layout/Loader'
import { admindeleteorder, adminorders  as adminordersaction } from "../../actions/orderActions";



export default function OrdersList(){
    const {adminOrders =[], loading =true, error , isOrderUpdated , isOrderDeleted } =useSelector(state => state.orderState);
    console.log("@ order list --> adminorders -->",adminOrders ,"--- isOrderDeleted --" ,isOrderDeleted)
 
    const dispatch = useDispatch();
    const setOrders  = () =>{
        const data = {
            columns : [
                {
                    label: "Order Id",
                    field : "id",
                    sort: "asc"
                },
                {
                    label: "No. of Items",
                    field : "noofitems",
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field : "amount",
                    sort: "asc"
                },  
                {
                    label: "Status",
                    field : "status",
                    sort: "asc"
                },
               
                {
                    label:"Actions",
                    field: "actions",
                    sort: 'asc'
                }
            ],
            rows :[]
        }   
        adminOrders.forEach(order => {
            data.rows.push({
                id : order._id,
                noofitems:order.orderitems.length,
                amount: `Rs ${order.totalprice}`,
                status: order.orderstatus &&  order.orderstatus.includes("Delivered") ?
                (<p  style ={{color:'green'}}> {order.orderstatus} </p> ): 
                 (<p style ={{color:'red'}}> {order.orderstatus} </p> ),
                 actions : 
                 <Fragment>
                     <Link to={`/admin/orders/update/${order._id}` }>  
                         <i className="fa fa-pencil px-4 py-1"></i>
                     </Link>
                     <button onClick={ (e) => handleDelete (e , order._id)} className="btn btn-danger px-2 py-1">
                         <i className="fa fa-trash"></i>
                     </button>
                 </Fragment>
            }) 
            
        });

        return data;             
                
    }

const handleDelete = (e , id) =>{
    e.target.disabled = true;
    console.log(" handle delter isOrderDeleted  ---",isOrderDeleted)
    dispatch(admindeleteorder(id));

}
useEffect( ()=>{
    console.log(" useEffect     OrderDeleted  ---",isOrderDeleted)
    if(error){
        toast( (error  ) ,{
           type:"error",
           position : toast.POSITION.BOTTOM_CENTER,
           onOpen: ()=> {dispatch(clearOrderError())}
        })
        return;
    }
    console.log("2nddd   useeffect---",isOrderDeleted)
    if(isOrderDeleted){
        toast("Order Deleted Successfully" ,{
            type:"success",
            position : toast.POSITION.BOTTOM_CENTER,
            onOpen: ()=> {dispatch(clearAdminDeleteOrder())}     
         })
         return;
    }
    dispatch(adminordersaction())           
}, [dispatch, error ,isOrderDeleted]);       

    return(

        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
        <div className="col-12 col-md-10">
          <div className="col-12 col-md-10">
                <h1 className="my-4">Order Listvv</h1>  
                    <Fragment>
                    {loading ? <Loader/> :
                   
                    <MDBDataTable 
                        data = {setOrders()}     
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