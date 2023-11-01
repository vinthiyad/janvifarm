import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderCompleted } from "../../slices/cartSlice";
import {toast} from 'react-toastify';
import { createOrder } from "../../actions/orderActions";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
// 5267 3181 8797 5449  test ing master card details
export default function PaymentCODRAZ(){   

  
    const [paymentMethod , setPaymentMethod] = useState("");
    const [paymentId , setPaymentId] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {items:cartItems} = useSelector((state) =>state.cartState)
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));   
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));   
    const [paymethod, setPayMethod] = useState("");
   
   const paymentData = {
                amount: orderInfo.totalprice,
   }

   const order ={
    shippinginfo : shippingInfo,   
    orderitems :cartItems   
    }
 
if(orderInfo){
    order.totalprice  = orderInfo.totalprice;  
    order.shppingprice  = orderInfo.shippingprice;
    order.taxprice  = orderInfo.taxprice;
    order.itemsprice  = orderInfo.itemsprice;  
}

   const initPayment = (data) => {
    
    const options = {
        key: "rzp_test_BQMdKYirdDImC6",
        amount: data.amount,
        currency: data.currency,
        description: "Queen",
        order_id: data.id,
      /*   handler: async (response) => {
            try {
                const verifyUrl = "http://localhost:3000/api/v1/payment/verify";  
                const { data } = await axios.post(verifyUrl, response);
                console.log(" initPayment -data @ ----->",data);
            } catch (error) {
                console.log(error);
            }
        }, */  

        handler: function (response) {
           
            const paymentid = response.razorpay_payment_id;
            const orderid = response.razorpay_order_id;
            const razorpaysignature = response.razorpay_signature;
            if(orderid){
                  order.paymentinfo = { 
                    paymentid: paymentid,
                    orderid : orderid,
                    status: "success"
                }
                dispatch(orderCompleted())
                dispatch(createOrder(order))
                navigate('/order/success')  
            }else{
                toast('Please Try again!', {
                    type: 'warning',
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
          },
    }; 

    const rzp = new window.Razorpay(options);  
    rzp.on('payment.submit', (response) => {
        paymentMethod = response.method;
    });
  
      // To get payment id in case of failed transaction.
      rzp.on('payment.failed', (response) => {
        paymentId = response.error.metadata.payment_id;   
    });
 
    rzp.open();
  
   }
      
   
    const handleSubmit =  async (e)  =>  {
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;  
        try {
            if(paymethod === "cod") {
                console.log("cod")
                order.paymentinfo = {
                    paymentid: "COD"+nanoid(),
                    orderid : "COD"+nanoid(),
                    status: "success"
                }
                dispatch(orderCompleted());
                dispatch(createOrder(order))

                navigate('/order/success')
        
            }
     
            if(paymethod === "razor"){ 
                console.log("raxor")
                const {data} = await axios.post("/api/v1/payment", paymentData)
                    if (!data) {
                        alert("Server error. Are you online?");
                        return;
                    }
                    if(data.error){
                        toast((await data).error.message ,{
                        type:"error",
                        position : toast.POSITION.BOTTOM_CENTER
                        })
                        document.querySelector("#pay_btn").disabled = false;
                    }else{
                        initPayment(data.order);
                    }

            }
        } catch (error) {
            console.log(error);
            
        }
}
return(  

            <div className="row wrapper" >  
         
                <div className="col-10 col-lg-5  d-inline" >
                <h1 className="mb-4">Payment Method</h1>
                <form  onSubmit={handleSubmit} className="shadow-lg" >
                <h5 className="mb-4 center">
                Order Total :{`Rs ${orderInfo && orderInfo.totalprice}`} </h5>
                <div className="form-check form-group">
                    <input className="form-check-input " 
                    type="radio"  id="cod" value="cod"
                    onChange={(e) => setPayMethod(e.target.value)}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Cash On Delivery
                    </label>
                </div>
            
                <div className="form-check form-group">
                <input className="form-check-input " 
                 type="radio"   id="razor"   value="razor"
                 onChange={(e) => setPayMethod(e.target.value)}  />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                Razor Pay
                </label>
                </div>

                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"   
                 disabled = {!paymethod}
                 >
                  Place Your Order
                </button> 
                </form>




                </div>
        </div>


    )
}