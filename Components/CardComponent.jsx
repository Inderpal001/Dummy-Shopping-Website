import React from 'react';
import { FaStar } from "react-icons/fa";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import Image from 'next/image';
import { useAppDispatch } from '@/lib/store/hooks';
import { addToCart } from '@/lib/store/slices/cartSlice';
import toast from 'react-hot-toast';

export default function CardComponent({ image, title, desc, rating, price, id, product }) {
  const dispatch = useAppDispatch()
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added Succesfully")
  }

  return (
    <div id={id} className='sm:w-[300px] lg:w-[350px] m-auto w-[80%] h-[450px] flex flex-col gap-2  bg-white border border-gray-100 rounded-lg p-5 hover:scale-[1.05] ease-out duration-200 cursor-pointer'>
      <div className="relative w-full h-[200px]">
        <Image src={image} alt="" layout="fill" objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <h1 className='text-center mt-3 text-2xl font-semibold'>{title.slice(0, 22)}...</h1>
      <h4 className='text-center text-lg leading-6'>{desc.slice(0, 75)}...</h4>
      <div className='flex items-center gap-2 justify-end'><span>{rating}</span><FaStar color='gold' className='drop-shadow-sm' /></div>
      <div className='flex justify-between mt-2'>
        <div className='flex items-center'><HiMiniCurrencyDollar className='text-xl' color='green' /> <p className='text-lg font-medium'>{price} </p></div>
        <button onClick={() => handleAddToCart(product)} className='btn px-3 py-1 bg-violet-500 hover:bg-violet-400 duration-200 text-white rounded-md'>Add to Cart</button>
      </div>
    </div>
  )
}
