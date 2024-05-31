import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const existingitems=localStorage.getItem('cart')
        if(existingitems){
            const cartItems=JSON.parse(existingitems)
            setCart(cartItems)
        }

       // Check for expired cart items
    const checkCartExpiration = () => {
        const cartTimestamp = JSON.parse(localStorage.getItem('cartTimestamp'));
        if (cartTimestamp) {
          const now = Date.now();
         const eightHours = 8 * 60 * 60 * 1000;
      
          if (now - cartTimestamp > eightHours) {
            localStorage.removeItem('cart');
            localStorage.removeItem('cartTimestamp');
            setCart([]);
            console.log('Cart expired and cleared.');
          }
        }
      };
  
      checkCartExpiration();

      const interval = setInterval(() => {
        checkCartExpiration();
      }, 60000); 
  
      return () => clearInterval(interval); 
    }, []);
  


    


    

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
