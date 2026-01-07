/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

// This file intentionally only exports React components/hooks to satisfy
// react-refresh's only-export-components rule.

const initialState = {
  items: [], // { id, quantity }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { id, quantity } = action.payload
      const existing = state.items.find((item) => item.id === id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { id, quantity }],
      }
    }
    case 'REMOVE': {
      const { id } = action.payload
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      }
    }
    case 'SET_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        }
      }
      return {
        ...state,
        items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
      }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const value = useMemo(() => {
    const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

    const addToCart = (id, quantity = 1) => {
      dispatch({ type: 'ADD', payload: { id, quantity } })
    }

    const removeFromCart = (id) => {
      dispatch({ type: 'REMOVE', payload: { id } })
    }

    const updateQuantity = (id, quantity) => {
      dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } })
    }

    const clearCart = () => {
      dispatch({ type: 'CLEAR' })
    }

    return {
      items: state.items,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}

export { CartProvider, useCart }
