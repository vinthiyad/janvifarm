import { useElements, useStripe } from "@stripe/react-stripe-js"
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateshipping } from "./Shipping";
import { CardNumberElement,CardExpiryElement,CardCvcElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from 'axios';
import { orderCompleted } from "../../slices/cartSlice";

export default function PaymentStripe() {   
  const stripe = useStripe();
  const elements = useElements();
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));   
  const {user} = useSelector(state => state.authState);
  const {items : cartItems,shippingInfo} = useSelector(state => state.cartState);
  const paymentData ={
        amount :Math.round(orderInfo.totalprice * 100),
        "shipping": 
        {
            name : user.name,
            address: { 
            country: shippingInfo.country,
            city: shippingInfo.city,
            postal_code: shippingInfo.postalcode,
            line1:  shippingInfo.address
            }, 
            phone: shippingInfo.phoneno
            
        } 
  }

  const order ={
        shippingInfo,
        orderitems: cartItems,

  }
    if(orderInfo){
        order.totalprice = orderInfo.totalprice;
        order.taxprice = orderInfo.taxprice;
        order.itemsprice = orderInfo.itemsprice;
        order.shippingprice = orderInfo.shippingprice;
    }

    useEffect( () =>{
        validateshipping(shippingInfo,navigate);
    },[])

    const hanldeSubmit =  async(e) =>{
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;
        try {
         const {data} = axios.post("/api/v1/payment/process" ,paymentData);
         const clientsecret =  data.client_secret;
         const result = stripe.confirmPayment(clientsecret,{
              payment_method:{
                card: elements.getElement(CardNumberElement),
                billing_details : {
                  name : user.name,
                  email: user.email
                 }
              }
         })
         if(result.error){
            toast((await result).error.message ,{
               type:"error",
               position : toast.POSITION.BOTTOM_CENTER
            })
            document.querySelector("#pay_btn").disabled = false;
         }else{
          if( (await result).paymentIntent.status === "succeeded") {
              toast("Payment Success" ,{
                type:"success",
                position : toast.POSITION.BOTTOM_CENTER
              })
              dispatch(orderCompleted());
              navigate("/order/success");
          }else{
            toast("Please Try Again" ,{
              type:"warning",
              position : toast.POSITION.BOTTOM_CENTER
            })
          }

         }
        } catch (error) {
          
        }
    }

    return(  
    <div className="row wrapper" >  
         
		    <div className="col-10 col-lg-5" >
            <form onSubmit={hanldeSubmit} className="shadow-lg" >
                <h1 className="mb-4">Card Info vv</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                 {/*  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"  
                  
                  /> */}
                   <CardNumberElement  style={{"width":"100%"}}
                        type="text"
                        id="card_num_field"
                        className="form-control"
                       
                    />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                   
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"    
                    
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay {`Rs ${orderInfo && orderInfo.totalprice}`}
                </button> 
    
              </form>
			  </div>

        
        
         </div> 
    )
}