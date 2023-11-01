import { Fragment, useEffect } from "react";
import Loader from '../layout/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { orderDetail  as orderDetailAction} from "../../actions/orderActions";

export default function OrderDetails(){
    const dispatch = useDispatch();
    const { loading , orderDetail } =    useSelector((state) => state.orderState) 
    const { shippinginfo ={} , user={} ,orderstatus="processing",orderitems=[] , totalprice = 0 ,paymtniinfo={}}  = orderDetail;
    const  {id} = useParams();

    useEffect( ()=>{
        dispatch(orderDetailAction(id));  
    },[id])    


     

    return(
        <Fragment>
        {loading ? <Loader/> :
        <Fragment>
         
        <div className="row d-flex justify-content-between">
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
        </div> 
        </Fragment> 
        }
    </Fragment>
   
    )
}