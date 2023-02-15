import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import "./index.css";
//import Header from "./Header.js";

export default function Home() {
  return (
    
    <div className="home-container">
      
      <div>
	  
		
        <h1 className="sub-title"> A Place For All Your Wishes</h1>
      </div>
      <div className= "button-container">
        <Link to={"/create"}>
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
           I want to create a wishlist!
          </button>
        </Link>
      </div>
      <div>
        <h3>
          Here you can create your wishlist to share with friends and family!
        </h3>
      </div>
    </div>
  );
}
