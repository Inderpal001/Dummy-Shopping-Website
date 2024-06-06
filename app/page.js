import Products from '@/Components/Products';
import React from 'react';
import CartButton from '@/Components/CartButton';
import "./page.scss";

export default function page() {
  return (
    <div className='home-page'>
      <h1 className='home-page-heading'>Shopping</h1>
      <Products />
      <CartButton />
    </div>
  )
}

