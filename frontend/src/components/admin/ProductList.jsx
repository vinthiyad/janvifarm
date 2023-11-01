import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearerror } from "../../slices/productSlice"; 
import { deleteProduct, getadminProducts } from "../../actions/productsActions";
import {MDBDataTable} from 'mdbreact';
import Sidebar from "./Sidebar";
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import Loader from '../layout/Loader'
import { clearProductDelete } from "../../slices/productSlice";

export default function ProductList(){
    const {products, loading =true, error} =useSelector(state => state.productsState);
    const {isProductDeleted ,error:productError } =useSelector(state => state.productState);
    console.log(" productc s @ Product Lis -->",products)  
    const dispatch = useDispatch();
    const setProducts  = () =>{
        const data = {
            columns : [
                {
                    label:"ID",
                    field: "id",
                    sort: 'asc'
                },
                {
                    label:"Name",
                    field: "name",
                    sort: 'asc'
                },
                {
                    label:"Price",
                    field: "price",
                    sort: 'asc'
                },
                {
                    label:"Stock",
                    field: "stock",
                    sort: 'asc'
                },
                {
                    label:"Actions",
                    field: "actions",
                    sort: 'asc'
                }
            ],
            rows :[]
        }   
          products&& products.forEach(product =>{
            data.rows.push({
                id: product._id,
                name : product.name,
                price: product.price,
                stock:product.stock,
                actions : 
                <Fragment>
                    <Link to={`/admin/product/${product._id}` }>
                        <i className="fa fa-pencil px-4 py-1"></i>
                    </Link>
                    <button onClick={ (e) => handleDelete (e , product._id)} className="btn btn-danger px-2 py-1">
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })

            
           })

        return data;           
                
    }

const handleDelete = (e , id) =>{
    e.target.disabled = true;
    dispatch(deleteProduct(id));

}
useEffect( ()=>{
    if(error || productError){
        toast( (error || productError ) ,{
           type:"error",
           position : toast.POSITION.BOTTOM_CENTER,
           onOpen: ()=> {dispatch(clearerror())}
        })
        return;
    }
    if(isProductDeleted){
        toast("Product Deleted Successfully" ,{
            type:"success",
            position : toast.POSITION.BOTTOM_CENTER,
            onOpen: ()=> {dispatch(clearProductDelete())}   
         })
         return;
    }
    dispatch(getadminProducts)
}, [dispatch, error ,isProductDeleted]);   

    return(

        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
        <div className="col-12 col-md-10">
          <div className="col-12 col-md-10">
                <h1 className="my-4">Product List</h1>  
                    <Fragment>
                    {loading ? <Loader/> :
                   
                    <MDBDataTable 
                        data = {setProducts()}   
                        bordered
                        striped
                        hover
                        responsive
                    />
                    }    
                    </Fragment>  
            </div>
        </div>


        </div>

    )
}