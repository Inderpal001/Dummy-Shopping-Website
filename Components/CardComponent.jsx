import React from 'react';
import { FaStar } from "react-icons/fa";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import Image from 'next/image';
import { useAppDispatch } from '@/lib/store/hooks';
import { addToCart } from '@/lib/store/slices/cartSlice';
import toast from 'react-hot-toast';
import "./CardComponent.scss";

export default function CardComponent({ image, title, desc, rating, price, id, product }) {
  const dispatch = useAppDispatch()
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added Succesfully")
  }

  return (
    <div id={id} className='cardContainer'>
      <div className="img-container">
        <Image src={image} alt="" layout="fill" objectFit="contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <h1 className='product-title'>{title.slice(0, 22)}...</h1>
      <h4 className='product-desc'>{desc.slice(0, 75)}...</h4>
      <div className='rating-div'><span>{rating}</span><FaStar color='gold' className='drop-shadow-sm' /></div>
      <div className='price-btn-div'>
        <div className='price-div'><HiMiniCurrencyDollar className='dollar-symbol' /> <p className='price'>{price} </p></div>
        <button onClick={() => handleAddToCart(product)} className='add-btn'>Add to Cart</button>
      </div>
    </div>
  )
}
