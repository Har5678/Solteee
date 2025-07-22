import React, { useEffect, useState } from 'react'
import { products } from '../assets/Products';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {
    const [related,setRelated] = useState([]);

    useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice();
            productsCopy=productsCopy.filter((item)=>category===item.category)
            productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory)
            console.log(productsCopy);
            setRelated(productsCopy.slice(0,5));
        }
    },[products]);

  return (
     <div className='my-15'>
        <h2
        className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black"
        style={{
          fontFamily: 'Cormorant Garamond, serif',
        }}
      >
        Related Products
      </h2>
        <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex gap-4 w-max snap-x snap-mandatory py-1 border border-gray-200">
            {related.map((item,index)=>(
                <ProductItem  key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))}
        </div>
        </div>
     </div>
  )
}

export default RelatedProducts