"use client";

import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import Loader from "./Loader";
import "./Products.scss"

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
      <div className="products-container">
        <div className="category-btn-container">
          <button
            onClick={() => setCategory("")}
            className="category-btn"
          >
            All
          </button>
          <button
            onClick={() => setCategory("category/men's%20clothing")}
            className="category-btn"
          >
            Men&apos;s Clothing
          </button>
          <button
            onClick={() => setCategory("category/women's%20clothing")}
            className="category-btn"
          >
            Women&apos;s Clothing
          </button>
          <button
            onClick={() => setCategory("category/electronics")}
            className="category-btn"
          >
            Electronics
          </button>
          <button
            onClick={() => setCategory("category/jewelery")}
            className="category-btn"
          >
            Jewellery
          </button>
        </div>

        <div className="cards-wrapper">
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            data.map((item, i) => {
              return (
                <CardComponent
                  key={i}
                  product={item}
                  id={item.id}
                  title={item.title}
                  desc={item.description}
                  rating={item.rating.rate}
                  price={item.price}
                  image={item.image}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
