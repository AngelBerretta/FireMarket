import '../css/ItemCount.css'
import { useState } from 'react'

const ItemCount = ({ initial = 1, stock = 10, onAdd }) => {
  const [quantity, setQuantity] = useState(initial)

  const increment = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAdd = () => {
    if (quantity > 0 && quantity <= stock) {
      onAdd(quantity)
    }
  }

  // Determinar clase de stock
  const getStockClass = () => {
    if (stock === 0) return 'stock-low'
    if (stock < 5) return 'stock-low'
    return 'stock-good'
  }

  const getStockMessage = () => {
    if (stock === 0) return '¡Sin stock disponible!'
    if (stock < 5) return `¡Solo quedan ${stock} unidades!`
    if (stock < 10) return 'Stock limitado'
    return 'Disponible en stock'
  }

  return (
    <div className="item-count">
      <div className="count-controls">
        <button 
          onClick={decrement} 
          className="count-button"
          disabled={quantity <= 1}
          aria-label="Disminuir cantidad"
        >
          −
        </button>
        
        <div className="count-display">
          <span className="count-number">{quantity}</span>
          <span className="count-stock">/ {stock}</span>
        </div>
        
        <button 
          onClick={increment} 
          className="count-button"
          disabled={quantity >= stock}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>
      
      <button 
        onClick={handleAdd} 
        className="add-to-cart-button"
        disabled={stock === 0}
        aria-label="Agregar al carrito"
      >
        <span>Agregar al carrito</span>
        <span className="cart-icon">🛒</span>
      </button>
      
      {stock > 0 && (
        <div className="stock-info">
          <span className={`stock-message ${getStockClass()}`}>
            {getStockMessage()}
          </span>
        </div>
      )}
      
      {stock === 0 && (
        <div className="stock-info">
          <span className="stock-message stock-low">
            Producto no disponible
          </span>
        </div>
      )}
    </div>
  )
}

export default ItemCount