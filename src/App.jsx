import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {
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

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
      cleanCart={cleanCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
        { data.map((guitar)=> (
          <Guitar
            key={guitar.id}
            guitar={guitar}
            addToCart={addToCart}/>
    )) }
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">Carrito con React</p>
        </div>
    </footer>
    </>
  )
}

export default App
