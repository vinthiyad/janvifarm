import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



export default function Search(){
const [searchText , setSearchText] = useState("");  
const navigate = useNavigate();
const location = useLocation();
const handleSearch = (e) =>{
    e.preventDefault();
    if(searchText){
        navigate(`/search/${searchText}`)   
    }
    if(searchText===""){
      console.log("EMPTY TEXT IN SERACH BOX")
      navigate("/")   
    }
}

const clearSearch = () =>{
  setSearchText("");    
}
useEffect( () =>{
  if(location.pathname === "/")  
  clearSearch();
}, [location])

    return(
        <form onSubmit={handleSearch}>
        <div className="input-group">
           
        <input
          type="text"
          id="search_field"
          className="form-control"  
          placeholder="Enter Product Name ..."
          value={searchText}
          onChange={(e)=> {setSearchText(e.target.value)}}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>  
          </button>
        </div>
       
      </div>
      </form>
    )
}