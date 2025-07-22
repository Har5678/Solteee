import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const ShopContext= createContext();

const ShopContextProvider = (props) => {

    const [currentCategory,setCurrentCategory]=useState("Mens");
    const [subCategory,setSubCategory]=useState("");
    const location=useLocation();
    const Categories = [
    {
      id: 1,
      Category: "Mens",
      SubCategory: ["T-Shirts", "Shirts", "Polo", "Summers", "Oversized"],
      link:"/"
    },
    {
      id: 2,
      Category: "Womens",
      SubCategory: ["T-Shirts", "Shirts", "Summers", "Oversized"],
      link:"/womens"
    },
    {
      id: 3,
      Category: "Shoes",
      SubCategory: ["Sneakers", "Sports Shoes", "Formal Shoes", "Casual Shoes", "Boots"],
      link:"/shoes"
    }
  ];

  useEffect(() => {
    if(location.pathname==="/") setCurrentCategory("Mens");
    if(location.pathname==="/womens") setCurrentCategory("Womens");
    if(location.pathname==="/shoes") setCurrentCategory("Shoes");
    if(location.pathname==="/register") setCurrentCategory("Mens");
    if(location.pathname==="/login") setCurrentCategory("Mens");
    
  }, [location.pathname]);



    const value={ Categories, currentCategory, setCurrentCategory, subCategory, setSubCategory };

  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;