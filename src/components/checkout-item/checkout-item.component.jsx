import {useContext} from "react";

import {CartContext} from "../../contexts/cart.context";

import './checkout-item.style.scss'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem
  const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext)

  const addItemHandler = () => addItemToCart(cartItem)
  const removeItemhandler = () => removeItemToCart(cartItem)

  return (
    <div className='checkout-item-container'>
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`}/>
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <span onClick={removeItemhandler} className="arrow">
          &#10094;
        </span>
        <span className='value'>
          {quantity}
        </span >
        <span onClick={addItemHandler} className="arrow">
          &#10095;
        </span>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
    </div>
  )

}

export default CheckoutItem