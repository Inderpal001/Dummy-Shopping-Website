"use client"

import Link from "next/link";
import React, { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "@/lib/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import toast from 'react-hot-toast';
import BoxLoader from "@/Components/boxLoader/BoxLoader";

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
    <div className="w-full min-h-screen p-3 relative bg-slate-200">
      <div className='cursor-pointer absolute h-8 w-8 sm:w-12 sm:h-12 hover:shadow-md top-3 left-3 sm:left-10 sm:top-6 bg-white flex items-center justify-center rounded-[50%]'>
        <Link href="/"> <FaCircleArrowLeft className="text-lg sm:text-2xl" /></Link>
      </div>
      <h1 className="text-center text-3xl sm:text-5xl font-bold mt-0 sm:mt-4 mb-7">Shopping</h1>
      <div className="w-[90%] overflow-y-scroll m-auto">
        <h3 className="text-xl sm:text-3xl font-semibold mb-6">My Cart</h3>
        <div className="flex flex-col gap-6">

          {
            cartItems.length === 0 ? (<h1 className="text-center text-lg sm:text-2xl font-medium">No Items to Display</h1>) : (
              cartItems.map((item) => {
                return <div key={item.id} className="flex-col sm:flex-row flex items-center w-full p-2 justify-between bg-white border  border-gray-300 rounded-md">
                  <div className="flex sm:min-w-[56%] lg:min-w-[48%] w-full">
                    <div className="relative w-[25%] h-[auto]">
                    <Image src={item.image} alt="" layout="fill" objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    <div className="w-full md:max-w-[30%] ml-4 mt-2">
                      <h1 className="text-lg font-semibold">{item.title.slice(0, 15)}...</h1>
                      <p className="text-sm mt-1">
                        {item.description.slice(0, 40)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-5 sm:mt-0 items-center justify-between p-2 w-full  gap-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleDecreaseQuantity(item.id)} className="btn px-4 py-1 rounded bg-violet-500 text-white">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item.id)} className="btn px-4 py-1 rounded bg-violet-500 text-white">+</button>
                    </div>
                    <button onClick={() => handleRemove(item.id)} className="btn sm:mr-3 px-4 py-2 text-sm rounded bg-red-500 text-white">Remove</button>
                  </div>
                </div>
              })

            )
          }

        </div>

        <div className="flex items-center justify-between fixed bottom-0 left-0 w-full p-3 sm:p-6 bg-gray-100 shadow">
          <p className="text-lg sm:text-xl font-medium">Total Price : ${Math.floor(cartPrice)}</p>
          <button onClick={checkoutBtn} className="btn px-4 py-2 text-sm sm:text-md rounded bg-violet-500 text-white hover:bg-violet-400 duration-150">Checkout Now</button>
        </div>

        {
          loading && <div className="absolute left-0 top-0 w-full bg-black bg-opacity-50 h-screen z-10 flex justify-center items-center">
            <BoxLoader />
          </div>
        }
      </div>
    </div>
  );
}
