
import {Link}from 'react-router-dom';

export default function Sidebar(){
    return(
        <div className="sidebar-wrapper"> 
        <nav id="sidebar">
            <ul className="list-unstyled components">
            <li>
                <Link to="/admin/dashboard">
                <i className="fa fa-tachometer-alt"></i> Dashboard</Link>
            </li>
            <li>
                 Product
            </li>
            <li className='ml-4'>   
                <Link to ="/admin/products"><i className="fa fa-shopping-basket"></i> All</Link>
                <Link to ="/admin/product/new"><i className='fa fa-plus'></i> Create</Link>
            </li>
            <li>   
                <Link to ="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
            </li>

            <li> 
            <Link to ="/admin/users"><i className="fa fa-user-circle"></i> Users</Link>
            </li>

            <li>
            <Link to ="/admin/reviews"><i className="fa fa-comments-o"></i> Reviews</Link>
            </li>
    
        </ul>
        </nav>
        </div>
    )
}