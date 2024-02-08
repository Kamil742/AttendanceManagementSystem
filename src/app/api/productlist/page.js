"use client"

// import { useEffect, useState } from "react"
// import "./productlist.css"
// import {FetchData} from './api'

// const ProductApi = () => {
//     const [product, setProduct] = useState([])

//     useEffect(() => {
//         <FetchData />
//     }, [])

//     return (
//         <div>
//             <h1>Product List</h1>
//             <div className="maindiv">
//                 {product.map((item) => (
//                     <div className="Apidata" key={item.id}>
//                         {item.id}:{item.title}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default ProductApi


// ProductApi.js
import React, { useEffect, useState } from 'react';
import fetchData from './api'; // Adjust the path accordingly

const ProductApi = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchData('/products');
        setProduct(data.products);
        console.log(data.products);
      } catch (error) {
        // Handle errors if necessary
        console.error(error.message);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {product.map((item) => (
        <h2 key={item.id}>{item.title}</h2>
      ))}
    </div>
  );
}

export default ProductApi;
