import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";   
import { updateProduct } from "../../actions/productsActions";
import { getProduct } from "../../actions/productAction";
import {toast } from 'react-toastify';
import { clearProductUpdated, clearerror } from "../../slices/productSlice";    



export default function UpdateProduct(){
    const [name,setName ]= useState("");
    const [description,setDescription] = useState(""); 
    const [price,setPrice ]= useState("");
    const [category,setCategory] = useState("");
    const [stock,setStock ] = useState(0);
    const [seller,setSeller ] = useState("");
    const [images,setImages] = useState([]);
    const [imagespreview, setImagesPreview] = useState([]); 
    const [imagesclear,setImagesClear] = useState(false);
    const {id } = useParams();
    

    const {loading,error, isProductUpdated ,product } = useSelector( state => state.productState)
    const categories  =[  
      'Fish',
      'Vegetables',
      'Spices', 
      'Fruits',
      'Diary/Products',
      'Meat',
      'Poultry/ Products'

    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleImagesClear = () =>{
    setImages([]);
    setImagesPreview([]);
    setImagesClear(true);


  }

  const handleImages = (e) =>{
      const files = Array.from(e.target.files)
      console.log("files ---",files)
       files.forEach(  file =>{
         const filereader = new FileReader();
         filereader.onload = () => {
           if(filereader.readyState == 2){
              setImagesPreview(oldImageArray  => [...oldImageArray ,filereader.result])
              setImages(oldImageArray  => [...oldImageArray ,file])
             
            }
          }
          filereader.readAsDataURL(file)  
      })    
    } 

const handleSubmit = (e) => {
  e.preventDefault();
  const formdata = new FormData();
  
  formdata.append("name" ,name);
  formdata.append("price" ,price);
  formdata.append("description" ,description);
  formdata.append("stock" ,stock);
  formdata.append("category" ,category);
  formdata.append("seller" ,seller);
  images.forEach( image =>{
    formdata.append("images" ,image)
  })
  formdata.append("imagesclear" ,imagesclear);  
 
  dispatch(updateProduct(id,formdata)); 
  
}

useEffect( () =>{
  if(isProductUpdated) {
    toast ("Product Updated Successfully" , {   
       type: 'success',
       position : toast.POSITION.BOTTOM_CENTER,
       onOpen : () => dispatch(clearProductUpdated())  
    })
    setImages([])
    navigate("/admin/products");
    return;
  }

  if(error) {
    toast (error , {
       type: 'error',
       position : toast.POSITION.BOTTOM_CENTER,
       onOpen : () => dispatch(clearerror)  
    })

    return;
  }
dispatch(getProduct(id)); 

},[isProductUpdated,error,dispatch])

useEffect( () =>{
    if(product._id){
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setSeller(product.seller);
      setCategory(product.category);
      
      let images = [];
      product.images.forEach(image => {
        console.log("imgea preview -->",image)
        images.push(image.filename) 
       } )
       setImagesPreview(images);
    

    }
}, [product])

    return(

        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>
        <div className="col-12 col-md-10">
        <div className="col-12 col-md-10">
            
        <div className="wrapper my-2" > 
        <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
            <h1 className="mb-4">Update Products 
            </h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                onChange={ (e) =>setName(e.target.value)}  
                value={name}
                required
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={ (e) =>setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea className="form-control"  required
                onChange={ (e) =>setDescription(e.target.value)}
                value={description}
                id="description_field" rows="8" ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select required value={category} onChange={ (e) =>setCategory(e.target.value)} className="form-control" id="category_field">
                    <option value="">Select</option>
                    {categories.map(category => ( 
                         <option value={category} 
                         key={category} name={category}>   
                        {category}</option>
                    ))} 
                   
              
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={ (e) =>setStock(e.target.value)}

                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller} required
                  onChange={ (e) =>setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={handleImages} 
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>


                    </div>
                    {imagespreview.length > 0  && <span 
                    style ={{cursor: "pointer"}} 
                    onClick={handleImagesClear}> <i className="fa fa-trash"></i></span>}
                    { imagespreview.map(image => (
                        <img key={image} src={image}
                        alt={`Image Preview`} className="mt-4 pl-2  rounded" width="50" height="50" />
                        )
                    )}   
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              UPDATE
            </button>

          </form>
        </div>
        </div>
    </div>


    </div>

       

    )
}

