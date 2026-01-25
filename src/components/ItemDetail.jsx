import '../css/ItemDetail.css'
import { useState } from 'react'
import ItemCount from './ItemCount'

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = (qty) => {
    setQuantity(qty)
    alert(`Agregaste ${qty} ${product.name} al carrito`)
    // Aquí se conectaría con el contexto del carrito
  }

  return (
    <div className="item-detail">
      <div className="detail-grid">
        <div className="detail-image-container">
          <img src={product.image} alt={product.name} className="detail-image" />
          <div className="detail-category">
            <span className="category-badge">{product.category}</span>
          </div>
        </div>
        
        <div className="detail-info">
          <div className="detail-header">
            <h1 className="detail-title">{product.name}</h1>
            <div className="detail-price">
              <span className="price-main">${product.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="detail-description">
            <h3>Descripción</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Disponibilidad:</span>
              <span className={`meta-value ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                {product.stock > 0 ? `En stock (${product.stock} unidades)` : 'Sin stock'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Categoría:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">ID:</span>
              <span className="meta-value">{product.id}</span>
            </div>
          </div>
          
          {product.stock > 0 ? (
            <div className="detail-actions">
              <ItemCount 
                initial={1} 
                stock={product.stock} 
                onAdd={handleAddToCart}
              />
              {/* <button className="buy-now-button">
                Comprar ahora
                <span className="button-fire">🔥</span>
              </button> */}
            </div>
          ) : (
            <div className="out-of-stock">
              <p>Producto temporalmente sin stock</p>
              <button className="notify-button">Notificarme cuando esté disponible</button>
            </div>
          )}
          
          <div className="detail-features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <span className="feature-text">Envío gratis en compras mayores a $50</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🛡️</span>
              <span className="feature-text">Garantía de 12 meses</span>
            </div>
            <div className="feature">
              <span className="feature-icon">↩️</span>
              <span className="feature-text">Devolución en 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail