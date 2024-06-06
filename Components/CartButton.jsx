"use client"

import { useAppSelector } from '@/lib/store/hooks';
import React from 'react';
import { TiShoppingCart } from "react-icons/ti";
import Link from 'next/link';
import "./CartButton.scss";

export default function CartButton() {
  const items = useAppSelector(state => state.cart)
  return (
    <div className={`cart-button ${items.length >= 1 ? "bounce-animation" : ""} `}>
      <Link href="/cart"><TiShoppingCart className='cart-icon' /></Link>
    </div>
  )
}