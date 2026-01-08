import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const addToWishlist = productId => {
    setItems(prev => {
      if (!prev.includes(productId)) {
        const newItems = [...prev, productId];
        localStorage.setItem('wishlist', JSON.stringify(newItems));
        return newItems;
      }
      return prev;
    });
  };

  const removeFromWishlist = productId => {
    setItems(prev => {
      const newItems = prev.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return newItems;
    });
  };

  const isInWishlist = productId => items.includes(productId);

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
