import Products from '@/Components/Products';

import React from 'react';
import CartButton from '@/Components/CartButton';

export default function page() {
  return (
    <div className='w-full min-h-screen bg-slate-200 p-3 relative'>
      <h1 className='text-center text-5xl font-bold mt-4 mb-7'>Shopping</h1>
      <Products />
      <CartButton />
    </div>
  )
}

