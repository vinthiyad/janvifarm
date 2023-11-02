import {Fragment, React} from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import CarouselPage from './CarouselPage';




const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {items : cartItems} = useSelector(state =>state.cartState)
  const {isAuthenticated , user}=useSelector(state =>state.authState)

  console.log("@header -isAuthenticated --->",isAuthenticated,"--user --",user)
 
const handleLogout = () =>{
  dispatch(logout())
}


  return (
    <Fragment>
    <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
      <Link to="/"><span id="cart" >Janvi Farmvv</span></Link>
      </div>
    </div>   

    <div className="col-12 col-md-6 mt-2 mt-md-0">
    <Search/>
    </div>  

    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">  
       { 
      
       (isAuthenticated)?(  
        <Dropdown className="d-inline">
             <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'></Dropdown.Toggle>
          <DropdownToggle variant='default text-white pr-5' id='dropdown-basic' >
          <figure  className='avatar  avatar-nav'>
           <Image width="50px" src={user.avatar??'/images/login/Default_Avatar_Image.jpg'}   /> 
           </figure>
          <span>{user.name}</span>    
          </DropdownToggle>
          <DropdownMenu >
            {user.role === 'admin' && 
            <DropdownItem  className='text-dark' onClick={()=>{navigate("/admin/dashboard")}}> Dashboard</DropdownItem> }
            <DropdownItem  className='text-dark' onClick={()=>{navigate("/myorder")}}> Orders</DropdownItem>
            <DropdownItem  className='text-dark' onClick={()=>{navigate("/profile")}}> Profile</DropdownItem>
            <DropdownItem  className='text-danger' onClick={handleLogout}> Logout</DropdownItem>  
          </DropdownMenu>
        </Dropdown>

      ) :  
      <Link to="/login">  <button className="btn" id="login_btn">Login</button> </Link>
      }

  
     <Link  to ="/cart"> <span id="cart" className="ml-3">Cart</span></Link>
      <span className="ml-1" id="cart_count">{cartItems.length}</span> 
    </div>
  </nav>  

  </Fragment>
  )
}

export default Header