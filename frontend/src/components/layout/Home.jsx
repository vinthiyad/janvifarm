import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './MetaData'
import { getProducts } from '../../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';         
import NewProduct from '../product/NewProduct';  
import Pagination from 'react-js-pagination'  ;  
import Carousel from './CarouselPage';
import CarouselPage from './CarouselPage';
   

export default function  Home () {  
  const dispatch  = useDispatch(); 
  const {products, loading ,error,productsCount,productPerPage} =    useSelector((state) => state.productsState)
  const [currentPage , setCurrentPage] = useState(1);

  console.log("@ home products -->" , products)

const setCurrentPageNo = (pageNo) =>{
  setCurrentPage(pageNo)
}

  useEffect( () => {
     
    if(error) {
          return toast.error(error, {   
          position: toast.POSITION.BOTTOM_CENTER
          })
    }
      dispatch(getProducts(null,null,null,null,currentPage)) 
    }, [error, dispatch, currentPage])



  return (
    <>
       
    <CarouselPage></CarouselPage>    
     {loading ? <Loader/> :  
     <Fragment>
       <MetaData title={'Janvi Products'}></MetaData>   
      <section id="products" className="container mt-3">
      <div className="row">
        {products && products.map( (product) => (
          <NewProduct col={3}  key={product._id} product={product} />      
         
             
          ) )} 
            
      </div>
    </section>
    {productsCount > 0 && productsCount > productPerPage ?
    <div className='d-flex  justify-content-center mt-5'>
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

    </div>
  : null}
   </Fragment>
    //loading
    }
   

    </>
  )
}

