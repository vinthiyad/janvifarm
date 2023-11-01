import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice"
import axios from 'axios'; 


export const addCartITem = (id,quantity) =>  async(dispatch) => {
    console.log("@ add cart item -- quantity --",quantity)
    try {
        dispatch(addCartItemRequest());

        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch(addCartItemSuccess( {
            product : data.product._id,
            name  : data.product.name,
            price : data.product.price,
            image : data.product.images[0].filename,
            stock : data.product.stock,
            quantity
        }
        ))
    } catch (error) {
        
        
    }
}