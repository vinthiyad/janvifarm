export default function ProductReview({reviews}) {
    console.log("reviews -vv--" , reviews)
    return (
        <div className="reviews w-75 mt-5" >
        <h3>Reviews:</h3>
   
        <hr />  
        {reviews.map( (review) => (
            <div className="review-card my-3">
           
                <div className="rating-outer">
                    <div className="rating-inner" style={{width: `${review.rating/5*100}%`}} >
                    </div>  
                </div>
                <p className="review_user">{review.user.name}</p> 
                <p className="review_comment">{review.comment} {review.rating}</p>   

                <hr />
         
            </div>
               ))}
  
    </div>

    )
}