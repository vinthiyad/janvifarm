import { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { decreaseItemQty, increaseItemQty, removeItemFromCart } from "../../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart (){
    const {items } = useSelector(state => state.cartState)
    const dispatch  = useDispatch(); 
    const navigate = useNavigate();
    
    const increaseQty =  (item) =>{   
        const count = item.quantity;
        if(item.stock ==0 || count  >= item.stock ) 
        { return ;}
        dispatch(increaseItemQty(item.product))
    
    }

    const decreaseQty =  (item) =>{
        const count = item.quantity;
        if( count  === 1 )
        { return ;}
        dispatch(decreaseItemQty(item.product))
    }

    const handleCheckout = () =>{
            navigate("/login?redirect=shipping")
    }

    return(  
 <Fragment>
    {items.length==0 ?
        <div className="row mt-5 justify-content-center">
            <h2 ><b>Your  Cart is Empty </b>  </h2>
       </div>
       :
   
    <Fragment>
        <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 pl-1">
                {items.map(item => 
                <Fragment>
                
                <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.images} alt={item.name}  style ={{ "border-radius": "1rem"}} height="50" width="50"/>
                        </div>

                        <div className="col-5 col-lg-4">
                            <Link to={`/product/${item.product}`}>{item.name}cgdfgdfghdfgdfg</Link>
                            
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">   
                            <p id="card_item_price">Rs {item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                              <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                              {/*   <span className="btn btn-danger minus"  >-</span> */}
                                <input type="number" 
                                className="form-control count d-inline" 
                                value = {item.quantity} readOnly />

								<span className="btn btn-info plus" 
                                  onClick={() => increaseQty(item)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" 
                            onClick={() => dispatch(removeItemFromCart(item.product))}  
                            className="fa fa-trash btn btn-danger"></i>
                        </div>

                    </div>
                </div>
                <hr />
                </Fragment>
                )}
            </div>

            <div className="col-12 col-lg-3 my-4 pr-3">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item) => acc+item.quantity ,0)}(Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">Rs {items.reduce((acc, item) => acc+(item.quantity *item.price ) ,0)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" onClick={handleCheckout} className="btn btn-primary btn-block">Check out</button>
                </div>
            </div>
        </div>
    </Fragment>
    } 
    </Fragment>

    )
}