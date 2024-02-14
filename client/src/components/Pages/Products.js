import React from 'react'
import ProductsComp from '../ProductsComp/ProductsComp'
import NavB from '../Navbar/navbar'

function Products() {
  return (
    <React.Fragment>
      <NavB />
      <ProductsComp/>
    </React.Fragment>
  )
}

export default Products