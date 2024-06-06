"use client"

import { useAppSelector } from '@/lib/store/hooks';
import React from 'react';
import { TiShoppingCart } from "react-icons/ti";
import Link from 'next/link';

export default function CartButton() {
  const items = useAppSelector(state => state.cart)
  return (
    <div className={`cursor-pointer  fixed w-16 h-16 hover:shadow-md right-5 bottom-5 bg-white flex items-center justify-center rounded-[50%] ${items.length >= 1 ? "animate-bounce" : ""}`}>
      <Link href="/cart"><TiShoppingCart className='text-3xl' /></Link>
    </div>
  )
}
