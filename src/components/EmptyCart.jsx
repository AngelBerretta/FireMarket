import { Link } from 'react-router-dom'
import '../css/CartView.css'

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">🛒</div>
      <h2 className="empty-cart-title">Tu carrito está vacío</h2>
      <p className="empty-cart-description">
        Aún no has agregado productos. ¡Explora el catálogo y encuentra algo que te guste!
      </p>
      <Link to="/" className="empty-cart-button">
        <span>Explorar productos</span>
        <span className="empty-cart-button-fire">🔥</span>
      </Link>
    </div>
  )
}

export default EmptyCart
