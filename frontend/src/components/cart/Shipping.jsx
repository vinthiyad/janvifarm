import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps"; 
import { toast } from "react-toastify";

export const validateshipping = (shippingInfo,navigate) =>{
    if( !shippingInfo.phoneno||
        !shippingInfo.address||   
        !shippingInfo.city||
        !shippingInfo.postalcode||    
        !shippingInfo.country
    )
        {
        toast.error("Please fill shipping information" , {
            position:toast.POSITION.BOTTOM_CENTER
        })
        navigate("/shipping")   
    }
}


export default function Shipping(){   

const dispatch = useDispatch();
const navigate = useNavigate();


const {shippingInfo = {}} = useSelector(state =>state.cartState);
console.log("11111111shippingIkkkkkkknfo   1111111111",shippingInfo)
console.log("shippingInfo   ---",shippingInfo," - hippingInfo.address-",shippingInfo.address)
const [phoneno, setPhoneno] = useState(shippingInfo.phoneno);

const [address, setAddress] = useState(shippingInfo.address);
const [city, setCity] = useState(shippingInfo.city);
const [postalcode, setPostalCode] = useState(shippingInfo.postalcode);
const [country, setCountry] = useState(shippingInfo.country);
const [state, setState] = useState(shippingInfo.state);

/* const countrylist = Object.values(countries) */
const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(saveShippingInfo({phoneno,address, city, postalcode,country}))
    navigate("/order/confirm")
}

    return (
        <Fragment> 
        <CheckoutSteps shipping />        
        <div className="row wrapper mt-1">
        <div className="col-10 col-lg-5 ">
            <form onSubmit={handleSubmit} className="shadow-lg ">   
                <h2 className="mb-0">Shipping </h2>
                <div className="form-group">
                    <label htmlFor="address_field">Address</label>
                    <input
                        type="text"
                        id="address_field"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city_field">City</label>
                    <input
                        type="text"
                        id="city_field"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlhtmlFor="phone_field">Phone No</label>
                    <input
                        type="phone"
                        id="phone_field"
                        className="form-control"
                        value={phoneno}
                        onChange={(e) => setPhoneno(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="postal_code_field">Postal Code</label>
                    <input
                        type="number"
                        id="postal_code_field"
                        className="form-control"
                        value={postalcode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country_field">Country</label> 
               
                     <input
                        type="text"
                        id="country_field"
                        className="form-control"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>

                <button
                    id="shipping_btn"
                    type="submit"
                    className="btn btn-block py-3"
                >
                    CONTINUE
                    </button>
            </form>
        </div>


    </div> 

        </Fragment>
         



        )
}