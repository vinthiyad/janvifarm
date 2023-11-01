import React, { Fragment, useEffect, useState } from 'react'

import { getProducts } from '../../actions/productsActions';
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';         
import NewProduct from './NewProduct'; 
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';

export default function  ProductSearch () {
  const {keyword}  = useParams();
  const dispatch  = useDispatch(); 
  const {products, loading ,error,productsCount,productPerPage} =    useSelector((state) => state.productsState)
  const [currentPage , setCurrentPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(""); 
  const [ratings, setRatings] = useState(0);


  const categories = [
                'Fish',
                'Fruits',
                'Vegetables',
                'Meat',
                'Diary/Products',
                'Poultry/ Products',
                'Spices'
  ]

/*   const prices = [
    'Rs 10-100',
    'Rs 100-500',
    'Rs 500-1000',
    '> Rs 1000'
] */

const setCurrentPageNo = (pageNo) =>{
  setCurrentPage(pageNo)
}

  useEffect( () => {
     console.log("Price -->", price)
    if(error) {
          return toast.error(error, {   
          position: toast.POSITION.BOTTOM_CENTER
          })   
    }
      dispatch(getProducts(keyword,category,price,ratings,currentPage)) 
    }, [error, dispatch,category,price,ratings, currentPage])



  return (

<Fragment>
{loading ? <Loader/>:
    <Fragment>
        <MetaData title={'Buy Best Products'} />
        <h1 id="products_heading">Search Products</h1>
        <section id="products" className="container mt-5">
            <div className="row">
                <div className="col-6 col-md-3 mb-5 mt-1">
                  {/* Price Filter
                 
                      <div className="mt-1" >
                      <h5>Price</h5> {/* className="mb-3" */}
                      {/* <ul>
                      {prices.map(price =>
                        <li  key={price} id="category-list" className='mt-2 mb-2'
                          onClick={()=> {setPrice(price)}}  
                        >{price}</li>
                        )}
                        </ul>
                      </div>  */}

                 {/*  <hr className="my-5" />        
                    {/* Category Filter */}
                    <div className="mt-3">
                      <h5 className="mb-3" >Categories </h5> {/* className="mb-3" */}
                      <ul>  {/* className="pl-0"  */}
                        {categories.map(category =>
                        <li  key={category} id="category-list" className='mt-2 mb-2'
                          onClick={()=> {setCategory(category)}}  
                        >{category}</li>
                        )}
                      </ul>
                     </div> 


                     <hr  className="my-1" /> {/*  <hr className="my-5" />        
                    {/* REviews Filter */}
                    <div className="mt-3">
                      <h5 className="mb-3" >Reviews </h5> {/* className="mb-3" */}
                      <ul>  {/* className="pl-0"  */}
                        {[5,4,3,2,1].map(star =>
                        <li  key={star} id="category-list" className='mt-2 mb-2'
                          onClick={()=> {setRatings(star)} }>
                           <div className="rating-outer">
                              <div 
                              className="rating-inner"
                              style={{
                                  width: `${star * 20}%`
                              }}
                              > 
                              </div>
                          </div>
                          </li>
                        )}
                      </ul>
                     </div>
                     
              
                </div>
                <div className="col-6 col-md-9">
                    <div className="row">
                        { products && products.map(product => (
                            <NewProduct col={4} key={product._id}  product={product}/>
                        ))}
                    </div>

                </div>
            </div>
        </section>
        {productsCount > 0 && productsCount > productPerPage ? 
        <div className="d-flex justify-content-center mt-5">
               <Pagination 
            activePage={currentPage}
            onChange={setCurrentPageNo}
            totalItemsCount={productsCount}
            itemsCountPerPage={productPerPage}
            nextPageText={'Next'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass={'page-item' }
            linkClass={'page-link'}       
          />   
        </div> : null }
    </Fragment>
}
</Fragment>






  )
}