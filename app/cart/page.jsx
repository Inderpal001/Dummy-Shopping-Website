"use client"

import Link from "next/link";
import React, { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "@/lib/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import toast from 'react-hot-toast';
import BoxLoader from "@/Components/boxLoader/BoxLoader";
import "./page.scss"

export default function Cart() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  let cartItems = useAppSelector((state) => state.cart)

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId))
    toast.success("Item has been removed")
  }

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId))
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newPrice = item.price * (item.quantity + 1);
    }
  }

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId))
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 0) {
      const newPrice = item.price * (item.quantity - 1);
    }
  }

  const cartPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const checkoutBtn = () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(clearCart());
      setLoading(false);
      toast.success("You Successfully placed an Order")
    }, 5000)
  }

  return (
    <div className="cart-page">
      <div className='back-arrow'>
        <Link href="/"> <FaCircleArrowLeft className="arrow-icon" /></Link>
      </div>
      <h1 className="cart-page-heading">Shopping</h1>
      <div className="my-cart-wrapper">
        <h3 className="my-cart-heading">My Cart</h3>
        <div className="cart-items-continer">

          {
            cartItems.length === 0 ? (<h1 className="no-items">No Items to Display</h1>) : (
              cartItems.map((item) => {
                return <div key={item.id} className="cart-items">
                  <div className="cart-items-details-container">
                    <div className="cart-image-container">
                    <Image src={item.image} alt="" layout="fill" objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    <div className="cart-items-details">
                      <h1 className="cart-items-heading">{item.title.slice(0, 15)}...</h1>
                      <p className="cart-items-desc">
                        {item.description.slice(0, 40)}...
                      </p>
                    </div>
                  </div>

                  <div className="cart-item-quantity-removebtn">
                    <div className="cart-item-quantity-btns">
                      <button onClick={() => handleDecreaseQuantity(item.id)} className="quantity-btn">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item.id)} className="quantity-btn">+</button>
                    </div>
                    <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
                  </div>
                </div>
              })

            )
          }

        </div>

        <div className="checkout-container">
          <p className="price">Total Price : ${Math.floor(cartPrice)}</p>
          <button onClick={checkoutBtn} className="checkout-btn">Checkout Now</button>
        </div>

        {
          loading && <div className="cart-loader-wrapper">
            <BoxLoader />
          </div>
        }
      </div>
    </div>
  );
}
