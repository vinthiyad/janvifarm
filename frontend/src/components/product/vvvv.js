<Fragment>
{loading ? <Loader/>:
    <Fragment>
        <MetaData title={'Buy Best Products'} />
        <h1 id="products_heading">Search Products</h1>
        <section id="products" className="container mt-5">
            <div className="row">
                <div className="col-6 col-md-3 mb-5 mt-5">
                    <hr className="my-5" />        
                    {/* Category Filter */}
                    <div className="mt-5">
                         <h3 className="mb-3">Categories</h3>  
                       
                    </div>
              
                </div>
                <div className="col-6 col-md-9">
                    <div className="row">
                        { products && products.map(product => (
                            <Product col={4} key={product._id}  product={product}/>  
                        ))}
                    </div>

                </div>
            </div>
        </section>
        {productsCount > 0 && productsCount > resPerPage?
        <div className="d-flex justify-content-center mt-5">
               <Pagination 
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    totalItemsCount={productsCount}
                    itemsCountPerPage={resPerPage}
                    nextPageText={'Next'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass={'page-item'}
                    linkClass={'page-link'}
               />     
        </div> : null }
    </Fragment>
}
</Fragment>