import { useCart } from '../context/CartContext'
import CartView from './CartView'
import EmptyCart from './EmptyCart'

const CartContainer = () => {
  const { items } = useCart()

  // ── Render condicional ──────────────────────────────────────────
  // Si el carrito no tiene items → EmptyCart
  // Si tiene al menos uno       → CartView (lista + resumen)
  return items.length === 0 ? <EmptyCart /> : <CartView />
}

export default CartContainer
