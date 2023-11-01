import { Link } from "react-router-dom"



export default function NewProduct({col , product}){
 
return(   



<div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}> 
    <div className="card p-3 rounded">
      <img className="card-img-top mx-auto" id="product-img"   
         src={product.images[0].filename}  alt={product.name}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">
        <Link  to={`/product/${product._id}`}>  {product.name}</Link>
        </h6>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}>

            </div>
          </div>
          <span id="no_of_reviews">({product.numofReviews} Reviews)</span>
        </div>
        <p className="card-text">${product.price}</p>
       
    
        <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">  View Details </Link>  
      </div>
    </div>
  </div>


    )}