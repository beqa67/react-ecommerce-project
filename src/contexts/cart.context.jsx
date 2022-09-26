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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id )

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )
}

const clearCartItem = (cartItems, cartItemstoClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemstoClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
})

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const {type, payload} = action

  switch (type){
    case 'ADD_TO_CART':
      return {
        ...state,

      }
    default:
      throw new Error(`Unhandled Type ${type} in userReducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd))
  }

  const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal
  }

  return <CartContext.Provider value={value}>{ children }</CartContext.Provider>

}