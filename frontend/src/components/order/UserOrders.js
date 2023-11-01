import {Fragment, useEffect}  from  'react';
import MetaData from '../layout/MetaData';
import {MDBDataTable} from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux'
import { userorders as  userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

export default function UserOrders() {
const dispatch= useDispatch();
const {userOrders = [] } = useSelector((state) => state.orderState);

useEffect( () => {
    dispatch(userOrdersAction);   
} ,[dispatch])       


const setOrders = () =>{   
    const data  = {
         columns:[
            {
                label: "Order Id",
                field : "id",
                sort: "asc"
            },
            {
                label: "No. of Items",
                field : "noofitems",
                sort: "asc"
            },
            {
                label: "Amount",
                field : "amount",
                sort: "asc"
            },  
            {
                label: "Status",
                field : "status",
                sort: "asc"
            },
            {
                label: "Action",
                field : "action",
                sort: "asc"
            }

         ],
         rows:[]

    }
    userOrders.forEach(userorder => {
        data.rows.push({
            id : userorder._id,
            noofitems:userorder.orderitems.length,
            amount: `Rs ${userorder.totalprice}`,
            status: userorder.orderstatus &&  userorder.orderstatus.includes("Delivered") ?
            (<p  style ={{color:'green'}}> {userorder.orderstatus} </p> ): 
             (<p style ={{color:'red'}}> {userorder.orderstatus} </p> ),
            action: <Link to={`/myorder/detail/${userorder._id}`} className='btn btn-primary'> <i className='fa fa-eye'></i>   </Link>
        }) 
        
    });
    return data;
}


    return(
   
        <Fragment>
           <MetaData title= "My Order" /> 
            <h1 className='mt-3'>My Orders:</h1>
             <MDBDataTable  
                    className='px-3'  
                    hover 
                    striped
                    bordered
                    data={setOrders()}
                    > 
            </MDBDataTable> 
        </Fragment>

    )
}
