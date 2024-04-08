import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)

  useEffect(() =>{
    setData(db)
  }, [])

  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart(prevCart => [...prevCart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQty(id) {
    const itemExists = cart.findIndex(guitar => guitar.id === id)
    if(itemExists >= 0){
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }
  }

  function decreaseQty(id) {
    const itemExists = cart.findIndex(guitar => guitar.id === id)
    if(itemExists >= 0){
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity--
      if (updatedCart[itemExists].quantity === 0){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }else{
        setCart(updatedCart)
      }
    }
  }

  function cleanCart() {
    setCart([])
  }

  const isEmpty = useMemo( () => cart.length === 0, [cart])
  const cartTotal = useMemo( () => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart] )

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cleanCart,
    isEmpty,
    cartTotal
  }
}