import { createContext, useContext, useReducer, useEffect } from 'react'

// ─── 1. Crear el contexto ────────────────────────────────────────────────────
const CartContext = createContext()

// ─── 2. Constantes para localStorage ─────────────────────────────────────────
const CART_STORAGE_KEY = 'fire-market-cart'

// ─── 3. Funciones de persistencia ────────────────────────────────────────────
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      const parsed = JSON.parse(savedCart)
      if (parsed && Array.isArray(parsed.items)) {
        return parsed
      }
    }
  } catch (error) {
  }
  return { items: [] }
}

const saveCartToStorage = (state) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Error al guardar el carrito en localStorage:', error)
  }
}

// ─── 4. Estado inicial con carga desde localStorage ──────────────────────────
const initialState = loadCartFromStorage()

// ─── 5. Reducer: lógica pura de estado ──────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const exists = state.items.find(item => item.id === product.id)

      if (exists) {
        // Respetar el stock: no sumar más allá del disponible
        const newQty = Math.min(
          exists.quantity + quantity,
          product.stock ?? Infinity
        )
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: newQty }
              : item
          )
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock ?? 0,   // guardamos el stock disponible
            quantity
          }
        ]
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id)
        }
      }

      return {
        ...state,
        items: state.items.map(item => {
          if (item.id !== id) return item
          // No permitir superar el stock disponible
          const safeQty = Math.min(quantity, item.stock ?? Infinity)
          return { ...item, quantity: safeQty }
        })
      }
    }

    case 'CLEAR_CART': {
      return { items: [] }
    }

    default:
      return state
  }
}

// ─── 6. Provider: envuelve la app y expone estado + acciones ─────────────────
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Persistir en localStorage cada vez que cambia el estado
  useEffect(() => {
    saveCartToStorage(state)
  }, [state])

  // Derivados
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // ── Acciones ───────────────────────────────────────────────────────────────

  /**
   * Agrega un producto al carrito.
   * Valida que haya stock disponible antes de despachar.
   * @returns {{ ok: boolean, message?: string }}
   */
  const addItem = (product, quantity = 1) => {
    const stock = product.stock ?? 0

    if (stock === 0) {
      return { ok: false, message: 'Este producto no tiene stock disponible.' }
    }

    const inCart = state.items.find(item => item.id === product.id)
    const alreadyInCart = inCart ? inCart.quantity : 0

    if (alreadyInCart + quantity > stock) {
      const available = stock - alreadyInCart
      if (available <= 0) {
        return { ok: false, message: `Ya tienes el máximo disponible de "${product.name}" en el carrito.` }
      }
      return { ok: false, message: `Solo quedan ${available} unidad${available > 1 ? 'es' : ''} disponibles de "${product.name}".` }
    }

    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
    return { ok: true }
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  /**
   * Actualiza la cantidad de un item del carrito.
   * Respeta el stock guardado en el item.
   */
  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// ─── 7. Hook personalizado ────────────────────────────────────────────────────
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un <CartProvider>')
  }
  return context
}

export default CartContext
