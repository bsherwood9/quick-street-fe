import React, { useState, useEffect } from 'react';

import axiosWithAuth from '../../utils/axiosWithAuth';
import Product from './Product';
import '../../styling/customerFacingVendorProfile.css';

const Products = (props) => { 

  const [ vendorProducts, setVendorProducts ] = useState({
    products: [],
    count: 0
  })

  const getVendorProducts = (id) => {
    axiosWithAuth()
      .get(`/vendors/${id}/products`)
      .then(response => {
        // console.log(response);
        setVendorProducts({
          ...vendorProducts,
          products: response.data.data,
          count: response.data.count
        })
      })
      .catch(error => {
        console.log(error); 
      })
  }

  useEffect(() => {
    getVendorProducts(props.vendorId);
  }, [])

  return (
    <div className='product_section'>
      <header className='product_section_title'>Products</header>
      <div className='products_div'>
        {vendorProducts.products.map(product => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  )

}

export default Products;