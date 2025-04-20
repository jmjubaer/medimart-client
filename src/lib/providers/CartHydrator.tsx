"use client";

import { hydrateCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";


const CartHydrator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        dispatch(hydrateCart(parsedCart));
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
      }
    }
  }, [dispatch]);

  return null; 
};

export default CartHydrator;
