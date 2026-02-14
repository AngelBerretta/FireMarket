import { useEffect } from 'react'
import '../css/Toast.css'

const Toast = ({ product, onClose }) => {
  useEffect(() => {
    // Auto-cerrar después de 3 segundos
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="toast-container">
      <div className="toast-content">
        <div className="toast-icon">✅</div>
        
        <div className="toast-product">
          <img src={product.image} alt={product.name} className="toast-image" />
          <div className="toast-info">
            <h4 className="toast-title">¡Producto agregado!</h4>
            <p className="toast-product-name">{product.name}</p>
          </div>
        </div>

        <button className="toast-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
      </div>
      
      <div className="toast-progress">
        <div className="toast-progress-bar"></div>
      </div>
    </div>
  )
}

export default Toast
