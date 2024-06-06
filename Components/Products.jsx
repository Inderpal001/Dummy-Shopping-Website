"use client";

import React, {  useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import Loader from "./Loader";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const fetchingData = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${category}`);
      const products = await res.json();
      setData(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchingData();
}, [category]);

  return (
    <>
      <div className="flex flex-col flex-wrap gap-6 sm:w-[90%] w-full m-auto">
        <div className="flex w-full overflow-x-scroll sm:justify-end gap-3">
          <button onClick={() => setCategory("")} className="btn text-sm w-max sm:text-lg px-4 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-400 duration-200">
            All
          </button>
          <button onClick={() => setCategory("category/men's%20clothing")} className="btn text-sm w-max sm:text-lg px-4 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-400 duration-200">
            Men&apos;s Clothing
          </button>
          <button onClick={() => setCategory("category/women's%20clothing")} className="btn text-sm w-max sm:text-lg px-4 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-400 duration-200">
            Women&apos;s Clothing
          </button>
          <button onClick={() => setCategory("category/electronics")} className="btn text-sm w-max sm:text-lg px-4 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-400 duration-200">
            Electronics
          </button>
          <button onClick={() => setCategory("category/jewelery")} className="btn text-sm w-max sm:text-lg px-4 py-2 rounded-md bg-violet-500 text-white hover:bg-violet-400 duration-200">
            Jewellery
          </button>
        </div>

        <div className="flex flex-wrap gap-7 justify-center m-auto">
          {
            loading ? <> 
            <Loader/>
            <Loader/>
            <Loader/>
            <Loader/>
            <Loader/>
            <Loader/>
            <Loader/>
            <Loader/>
            </> : (
              data.map((item, i) => {
               return <CardComponent key={i} product={item} id={item.id} title={item.title} desc={item.description} rating={item.rating.rate} price={item.price} image={item.image} />
              })
            )
          }
        </div>
      </div>
    </>
  );
}


