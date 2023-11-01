
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';     
import {HelmetProvider } from 'react-helmet-async'; 
import {ToastContainer} from 'react-toastify';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';  
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import ProfileUpdate from './components/user/ProfileUpdate';
import PasswordChange from './components/user/PasswordChange';
import PasswordForget from './components/user/PasswordForget';
import PasswordReset from './components/user/PasswordReset';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';


import axios from 'axios';
import OrderSuccess from './components/cart/OrderSuccess';
import Dashboard from './components/admin/Dashboard';

import { useSelector } from 'react-redux';
import PaymentCODRAZ from './components/cart/PaymentCODRAZ';

import UserOrders from './components/order/UserOrders';
import OrderDetails from './components/order/OrderDetails';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import UpdateOrder from './components/admin/UpdateOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';



   
function App() {


  const {isAuthenticated }=useSelector(state =>state.authState);

 

  useEffect(()=>{
    store.dispatch(loadUser())
   

    },[])  


  return (
    <BrowserRouter>
    <div className="App">    
      <HelmetProvider>
       <Header/>
       <div className='container container-fluid'>
       <ToastContainer theme='dark'/>    
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/product/:id" element={  <ProductDetail/>} ></Route>   
          <Route path="/search/:keyword" element={  <ProductSearch/>} ></Route>
          <Route path="/login" element={  <Login/>} ></Route>
          <Route path="/register" element={  <Register/>} ></Route>
          <Route path="/profile" element={<ProtectedRoute> <Profile/></ProtectedRoute> } ></Route> 
          <Route path="/profileupdate" element={<ProtectedRoute> <ProfileUpdate/></ProtectedRoute> } ></Route> 
          <Route path="/profilepasswordupdate" element={<ProtectedRoute> <PasswordChange/></ProtectedRoute> } ></Route> 
          <Route path="/password/forget" element={ <PasswordForget/> } ></Route> 
          <Route path="/password/reset/:token" element={ <PasswordReset/> } ></Route> 
          <Route path="/cart" element={ <Cart/> } ></Route> 
          <Route path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>  } ></Route> 
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>  } ></Route> 
          <Route path="/order/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>  } ></Route> 
          <Route path="/myorder" element={<ProtectedRoute><UserOrders/></ProtectedRoute>  } ></Route> 
          <Route path="/myorder/detail/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>  } ></Route> 
          <Route path="/payment" element={<ProtectedRoute><PaymentCODRAZ/></ProtectedRoute>  } ></Route> 
       
    

          
         
        </Routes>
        </div>
        {/* Admin Routes */}   
          <Routes>
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>} ></Route>  
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>} ></Route>
          <Route path="/admin/product/new" element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>} ></Route> 
          <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} ></Route> 
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrdersList/></ProtectedRoute>} ></Route>   
          <Route path="/admin/orders/update/:id" element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>} ></Route>   
          <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList/></ProtectedRoute>} ></Route>
          <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} ></Route>   
          </Routes>  
     
       <Footer/>
       </HelmetProvider>   
    </div>
    </BrowserRouter>   
  );
}

export default App;
