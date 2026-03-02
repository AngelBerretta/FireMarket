import '../css/CartWidget.css'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { ShoppingCart } from 'lucide-react'

const CartWidget = () => {
  const { totalItems } = useCart()
  
  return (
    <Link to="/cart" className="cart-widget" style={{ textDecoration: 'none' }}>
      <div className="cart-icon">
        <ShoppingCart size={24} strokeWidth={2} />
      </div>
      {/* Render condicional: el badge solo aparece si hay items */}
      {totalItems > 0 && (
        <span className="cart-count">{totalItems}</span>
      )}
    </Link>
  )
}

export default CartWidget