import React,{createContext, useContext, useState} from 'react'


const CartContext = createContext()

export const useCart= () => useContext(CartContext)


export const CartProvider = ({children}) => {
    const[cartItems,setCartItems]=useState([])

    const addToCart=(product)=>{
        setCartItems((prevItems) =>{
            const existingItem= prevItems.find((item) => item._id === product._id)

            if(existingItem){
                return prevItems.map((item) =>
                    item._id === product._id ? {...item, quantity: item.quantity + 1} : item
                );
            }else{
                return [...prevItems, {...product,quantity:1}]
            }
        })
    }

    const removeFromCart=(productId)=>{
        setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
    )
    }

    const clearCart=() =>{
        setCartItems([])
    }

    const cartItemCount = cartItems.reduce((count,item) => count + item.quantity,0)
    const totalPrice = cartItems.reduce((total,item) => total + item.price * item.quantity,0)

  return (
   <CartContext.Provider
     value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartItemCount,
        totalPrice
     }}
   >
    {children}

   </CartContext.Provider>
  )
}


