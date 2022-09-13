import { createContext, useState, useEffect } from "react";

const addCartItems = (cartitems, productsToAdd) => {
  const existingCartItem = cartitems.find((cartItem) => cartItem.id === productsToAdd.id )

  if (existingCartItem) {
    return cartitems.map((cartItem) => cartItem.id === productsToAdd.id ?
      {...cartItem, quantity: cartItem.quantity + 1} : cartItem
    )
  }

  return [...cartitems, {...productsToAdd, quantity: 1}]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd))
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>

}