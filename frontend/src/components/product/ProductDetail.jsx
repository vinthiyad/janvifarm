import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import {Carousel} from 'react-bootstrap';  
import {Modal} from 'react-bootstrap';
import { addCartITem } from '../../actions/cartActions';    
import { getProduct } from '../../actions/productAction';    
import { createReview } from '../../actions/productsActions';  
import ProductReview from './ProductReview';
import { toast } from 'react-toastify';
import { clearReviewSubmitted ,clearerror ,clearProduct} from '../../slices/productSlice';




export default function ProductDetail(){
    const dispatch  = useDispatch(); 
    const {id} = useParams();

    const { loading, product = {}, isReviewSubmitted, error} = useSelector((state)=>state.productState);
    const {user} = useSelector((state)=>state.authState);
        console.log("id @ product detail -id s-",id , "--usr --" ,user,
    "-----------------------sReviewSubmitted------------------",isReviewSubmitted)  
    const [quantity,setQuantity] = useState(1); 


    const [rating, setRating ] = useState(1);
    const [review, setReview ] = useState("");
    const [comment, setComment ] = useState("");
    
    const increaseQty =  () =>{   
        const count = document.querySelector(".count")
        if(product.stock ==0 || count.valueAsNumber  >=product.stock )
        { return ;}
        const qty = count.valueAsNumber +1;  
        setQuantity(qty);   
    
    }

    const decreaseQty =  () =>{
        const count = document.querySelector(".count")
        if( count.valueAsNumber  === 1 )
        { return ;}
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);  
    
    }
    const handleReview = (e)=>{  
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("comment",comment);
        formdata.append("rating",rating);
        formdata.append("productid",id);     
        dispatch(createReview(formdata))  
        
    }
     
   useEffect( () => {
    if(isReviewSubmitted) {
        toast("Review Submittted" ,{
            type: 'success',
            position:toast.POSITION.BOTTOM_CENTER,
            onOpen : () => dispatch(clearReviewSubmitted())
        })
    }
        if(error) {
            toast(error ,{
                type: 'error',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen : () => dispatch(clearerror())
            })

         
   } 
   if(!product._id || isReviewSubmitted) {
    dispatch(getProduct(id))
    }

    
    return () => {
        dispatch(clearProduct())
    }
        

} , [dispatch,id,isReviewSubmitted, error])


  return (
    <Fragment>
       
        {loading ? <Loader/> :
        <Fragment>
            <MetaData title={product.name}/> 
            <div className="row f-flex justify-content-around">     
                 <div className="col-12 col-lg-5 img-fluid" id="product_image">
               <Carousel pause="hover">
                {product.images && product.images.map( image =>
                <Carousel.Item key={image._id}>
                    <img className="d-block w-100" src={image.filename} alt={product.name} height="500" width="500"/>
               </Carousel.Item>    
               
                ) }
               </Carousel>
               
                
             </div>

            <div className="col-12 col-lg-5 mt-5 ">
                <h3>{product.name}</h3>  
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                {/*     <p id="product_id">{product._id}</p> */}

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.numofReviews} Reviews)</span>

                <hr/>

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                 <button 
                 disabled={product.stock==0?true :false} 
                 type="button" id="cart_btn" 
                 className="btn btn-primary d-inline ml-4"
                 onClick= {()=> dispatch(addCartITem(product._id,quantity))}   
                  >
                Add to Cart</button>

                <hr/>

                <p>Status: <span id="stock_status" className= {product.stock >0 ?`greenColor` : `redColor`}>
                    {product.stock >0 ?`In Stock` : `Out Of Stock` }</span></p>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr/>
                { user ? 
               
               <Fragment>
                <h4 className="mt-2">Review:</h4> 
                <ul className="stars mt-4" >
                        {[1,2,3,4,5].map(star =>
                            <li   className={`star ${star<=rating?'orange':''}`}
                            key={star}  value={star}  
                            onClick={() =>setRating(star)} 
                            onMouseOver={(e) => e.target.classList.add('yellow')}
                            onMouseOut={(e) => e.target.classList.remove('yellow')}
                            ><i className="fa fa-star"></i></li>
                            
                            )}
                        
                </ul>

                <textarea name="review" id="review" 
                onChange ={(e) => setComment(e.target.value)}className="form-control mt-3">

                </textarea>
                <button onClick= { (e) =>handleReview(e)}
                id="review_btn" type="button" className="btn btn-primary mt-4"
                 disabled={!comment}>
                    Submit Your Review
                </button> 
                </Fragment>
               : 
               <div className='alert  alert-danger align-center'> Login to Post Review </div>
               }
                     
        </div>
        </div>
         { product.reviews && product.reviews.length > 0 ? 
         <ProductReview  reviews = {product.reviews}/> :"nn"}  


        </Fragment>
    
       }
    </Fragment>


    

  )
}
