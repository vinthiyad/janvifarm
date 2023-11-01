import { Fragment, useEffect } from "react";
import { validateshipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

export default function ConfirmOrder (){  
const {shippingInfo ,items:cartItems} = useSelector((state) =>state.cartState);
const {user} = useSelector((state) =>state.authState)

const navigate = useNavigate();
const itemsprice =cartItems.reduce((acc,item) => acc+ (item.price * item.quantity) ,0 );
const shippingprice = itemsprice > 200  ?  0 : 25 ;
let  taxprice  = Number(0.25 * itemsprice);
const totalprice  = Number(itemsprice+shippingprice+taxprice).toFixed(2);
taxprice  = Number(0.25 * itemsprice).toFixed(2);

const handleProceedPayment = () =>{    
    const paymentdata = {
        "itemsprice" : itemsprice,
        "shippingprice" :shippingprice,
        "taxprice" :taxprice,
        "totalprice":totalprice
    }
   
    sessionStorage.setItem("orderInfo",JSON.stringify(paymentdata));    
   
    navigate("/payment")
}

const handleStripePayment = () =>{    
    const paymentdata = {
        "itemsprice" : itemsprice,
        "shippingprice" :shippingprice,
        "taxprice" :taxprice,
        "totalprice":totalprice
    }
   
    sessionStorage.setItem("orderInfo",JSON.stringify(paymentdata));    
   
    navigate("/payment/stripe")
}


useEffect( () =>{
    validateshipping(shippingInfo, navigate)   
},[])

    return(

       <Fragment>   
        
        <CheckoutSteps shipping confirmorder  />
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Phone:</b> {shippingInfo.phoneno}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}, {shippingInfo.postalcode} </p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items:</h4>
               {cartItems.map( item => 
                <Fragment>  
                    <hr />
                    <div className="cart-item my-0">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.images} alt={item.name} height="45" width="65" />
                        </div>

                        <div className="col-5 col-lg-4">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-3 mt-4 mt-lg-0 ">  

                            <p>{item.quantity} x Rs {item.price} </p>
                        </div>
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0 ">

                        <p> <b> Rs {item.quantity  * item.price}</b></p>
                        </div>

                    </div>
                </div>

                </Fragment>
                    
               
               )} 
               
              
                <hr /> 

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">Rs {itemsprice.toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">Rs {shippingprice}</span></p>
                        <p>Tax:  <span className="order-summary-values">Rs {taxprice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">Rs {totalprice}</span></p>

                        <hr />
                        <button onClick={handleProceedPayment}id="checkout_btn" className="btn btn-primary btn-block">Proceed to Payment</button>
                        <hr />
                        <button onClick={handleStripePayment}id="checkout_btn" className="btn btn-primary btn-block">Proceed Stripe to Payment</button>
                    </div>
                </div>
			
			
        </div>
        </Fragment>      
    )
}