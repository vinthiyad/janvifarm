import { Fragment, useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";   
import { adminupdateorder ,orderDetail as orderDetailAction } from "../../actions/orderActions";
import {toast } from 'react-toastify';
import { clearAdminUpdateOrder, clearOrderError } from "../../slices/orderSlice";    



export default function UpdateOrder(){
    const {id } = useParams();
    const {loading, error , isOrderUpdated , orderDetail} =useSelector(state => state.orderState);
    const { shippinginfo ={} , user={} ,orderstatus="",orderitems=[] , totalprice = 0 ,paymtniinfo={}}  = orderDetail;
    const isPaid = paymtniinfo.status === 'succeeded' ? true : false;     
    const [orderStatus,setOrderStatus]  = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

 

  

const handleSubmit = (e) => {
  e.preventDefault();
  const orderdata = {};
  console.log("orderStatus-----------------------",orderStatus)
  orderdata.orderstatus = orderStatus;
  console.log("orderdata.orderstatus-----------------------",orderdata.orderstatus)
  dispatch(adminupdateorder(id,orderdata));      
  
}

useEffect( () =>{
  if(isOrderUpdated) {
    toast ("Order  Updated Successfully" , {   
       type: 'success',
       position : toast.POSITION.BOTTOM_CENTER,
       onOpen : () => dispatch(clearAdminUpdateOrder())  
    })
 
    navigate("/admin/orders");
    return;
  }

  if(error) {
    toast (error , {
       type: 'error',
       position : toast.POSITION.BOTTOM_CENTER,
       onOpen : () => dispatch(clearOrderError)  
    })

    return;
  }
dispatch(orderDetailAction(id));  

},[isOrderUpdated,error,dispatch])

useEffect( () =>{
    if(orderDetail._id){
      setOrderStatus(orderDetail.orderstatus);
    }

}, [])

    return(

        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>
        <Fragment>

        <div className="row d-flex justify-content-around mx-5">
        <div className="col-12 col-lg-8 mt-o order-details">

            <h2 className="my-3">Order # {orderDetail._id}</h2>

            <h4 className="mb-1">Shipping Info</h4>  
            <p><b>Name:</b> {user.name}</p> 
            <p><b>Phone:</b> {shippinginfo.phoneno}</p>  
            <p className="mb-4"><b>Address:</b>{shippinginfo.address}, {shippinginfo.city}, {shippinginfo.country}, {shippinginfo.postalcode}</p>
            <p><b>Amount:</b> Rs {totalprice}</p>

            <hr />

            <h4 className="my-4">Payment</h4>

            <p className="greenColor" ><b>PAID(WIP)</b></p>


            <h4 className="my-4">Order Status:</h4>
            {orderstatus&& orderstatus.includes("Delivered") ? 
            (<p  style ={{color:'green'}}> {orderstatus} </p> ): 
            (<p style ={{color:'red'}}> {orderstatus} </p> )
            }
        
            <h4 className="my-4">Order Items:</h4>

            <hr />
            <div className="cart-item my-1">
                {orderitems&& orderitems.map( orderitem => 
                        <div className="row my-5">
                            <div className="col-4 col-lg-2">
                                <img src= {orderitem.image} alt={orderitem.name} height="45" width="65" />
                            </div>

                            <div className="col-5 col-lg-5">  
                                <a href="#">{orderitem.name}</a>
                            </div>


                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p> Rs {orderitem.price}</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>{orderitem.quantity} No(s)</p>
                            </div>
                        </div>
                )}
            </div>
            <hr />
        </div>
        <div className="col-12 col-lg-3 mt-o order-status">
        <h4 className="my-4">Order Status</h4>
        <div className="form-group">
          <select class="form-select form-control " aria-label="select 3 order status"  
          value={orderStatus}
            onChange={(e) =>setOrderStatus(e.target.value)}   
            name="orderstatus " >
              <option value="Processing">Processing</option>
              <option value="Shipping">Shipping</option>
              <option value="Delivered">Delivered</option>  

          </select>
       
        </div>
        <button className="btn btn-primary  btn-block " onClick={handleSubmit}>Update Status</button>
        </div>
        </div> 
        </Fragment>


    </div>

       

    )
}

