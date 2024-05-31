import React from 'react'
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import {toast} from 'react-toastify'

const CartButton = ({p}) => {
    const [cart, setCart]=useCart()
  return (
    <>
     <button
                          className="small-font bg-danger border-0 text-white px-3 py-1 rounded-2 fw-bold text-uppercase"
                          onClick={() => {
                            const updatedProduct = { ...p, quantity: 1 }; 
                            setCart([...cart, updatedProduct]); 
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, updatedProduct])
                            );
                            localStorage.setItem(
                              "cartTimestamp",
                              JSON.stringify(Date.now())
                            );
                            toast.success("Item added successfully");
                          }}
                        >
                          Add to Cart
                        </button>
    </>
  )
}

export default CartButton