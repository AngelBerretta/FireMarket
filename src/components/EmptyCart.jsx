import { Link } from 'react-router-dom'
import '../css/CartView.css'
import { ShoppingCart, Flame } from 'lucide-react'

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">
        <ShoppingCart size={80} strokeWidth={1.5} />
      </div>
      <h2 className="empty-cart-title">Tu carrito está vacío</h2>
      <p className="empty-cart-description">
        Aún no has agregado productos. ¡Explora el catálogo y encuentra algo que te guste!
      </p>
      <Link to="/" className="empty-cart-button">
        <span>Explorar productos</span>
        <Flame className="empty-cart-button-fire" size={20} strokeWidth={2.5} />
      </Link>
    </div>
  )
}

export default EmptyCart