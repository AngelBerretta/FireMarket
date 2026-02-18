import '../css/ItemDetail.css'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'
import Toast from './Toast'

const ItemDetail = ({ product }) => {
  const [showToast, setShowToast] = useState(false)
  const [stockError, setStockError] = useState('')
  const [added, setAdded] = useState(false)
  const { addItem, items } = useCart()

  const availableStock = useMemo(() => {
    const itemInCart = items.find(item => item.id === product.id)
    const quantityInCart = itemInCart ? itemInCart.quantity : 0
    return product.stock - quantityInCart
  }, [product.id, product.stock, items])

  const handleAddToCart = (qty) => {
    setStockError('')
    const result = addItem(product, qty)

    if (result.ok) {
      setShowToast(true)
      setAdded(true)
    } else {
      setStockError(result.message)
    }
  }

  const handleCloseToast = () => {
    setShowToast(false)
  }

  return (
    <>
      {showToast && <Toast product={product} onClose={handleCloseToast} />}

      <div className="item-detail">
        <div className="detail-grid">
          {/* Columna izquierda - Imagen */}
          <div className="detail-left-column">
            <div className="detail-image-container">
              <div className="image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="detail-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="detail-category">
                <span className="category-badge">
                  <span className="badge-icon">🔥</span>
                  {product.category}
                </span>
              </div>
            </div>

            {/* ✨ VERSIÓN ULTRA-COMPACTA - Grid horizontal en desktop, vertical en mobile */}
            <div className="detail-features-compact">
              {/* Envío */}
              <div className="feature-compact shipping">
                <div className="feature-compact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 3h15v13H1zM16 8h3l3 3v5h-6V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="5.5" cy="18.5" r="2.5" strokeWidth="2"/>
                    <circle cx="18.5" cy="18.5" r="2.5" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="feature-compact-content">
                  <h4>Envío Gratis</h4>
                  <p>Compras +$50</p>
                </div>
              </div>

              {/* Garantía */}
              <div className="feature-compact warranty">
                <div className="feature-compact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="feature-compact-content">
                  <h4>Garantía</h4>
                  <p>12 meses</p>
                </div>
              </div>

              {/* Devolución */}
              <div className="feature-compact returns">
                <div className="feature-compact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 3v5h5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="feature-compact-content">
                  <h4>Devolución</h4>
                  <p>30 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Información */}
          <div className="detail-info">
            <div className="detail-header">
              <div className="product-id-badge">ID: {product.id}</div>
              <h1 className="detail-title">{product.name}</h1>
              
              <div className="price-stock-row">
                <div className="detail-price">
                  <span className="price-label">Precio</span>
                  <span className="price-main">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="stock-badge-wrapper">
                  <div className={`stock-badge ${availableStock > 0 ? 'in-stock' : 'out-stock'}`}>
                    <span className="stock-icon">
                      {availableStock > 0 ? '✓' : '✕'}
                    </span>
                    <div className="stock-info">
                      <span className="stock-status">
                        {availableStock > 0 ? 'Disponible' : 'Sin stock'}
                      </span>
                      {availableStock > 0 && (
                        <span className="stock-quantity">
                          {availableStock} unidades
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="detail-description">
              <h3 className="section-title">
                <span className="title-icon">📝</span>
                Descripción del producto
              </h3>
              <p className="description-text">{product.description}</p>
            </div>

            <div className="divider"></div>

            <div className="detail-meta-enhanced">
              <h3 className="section-title">
                <span className="title-icon">ℹ️</span>
                Información adicional
              </h3>
              <div className="meta-grid">
                <div className="meta-card">
                  <span className="meta-icon">📦</span>
                  <div className="meta-info">
                    <span className="meta-label">Categoría</span>
                    <span className="meta-value">{product.category}</span>
                  </div>
                </div>
                <div className="meta-card">
                  <span className="meta-icon">🏷️</span>
                  <div className="meta-info">
                    <span className="meta-label">Código</span>
                    <span className="meta-value">#{product.id}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {availableStock > 0 ? (
              <div className="detail-actions">
                {!added ? (
                  <>
                    <div className="action-header">
                      <h3 className="section-title">
                        <span className="title-icon">🛒</span>
                        Agregar al carrito
                      </h3>
                    </div>
                    <ItemCount
                      initial={1}
                      stock={availableStock}
                      onAdd={handleAddToCart}
                    />

                    {stockError && (
                      <div className="stock-error-message">
                        <span className="error-icon">⚠️</span>
                        {stockError}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="after-add-buttons">
                    <Link to="/cart" className="go-cart-btn">
                      <span className="btn-icon">🛒</span>
                      <span>Ir al carrito</span>
                    </Link>

                    <Link to="/" className="continue-btn">
                      <span className="btn-icon">🛍️</span>
                      <span>Seguir comprando</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="out-of-stock-enhanced">
                <div className="out-of-stock-icon">😔</div>
                <h3 className="out-of-stock-title">Producto agotado</h3>
                <p className="out-of-stock-description">
                  {product.stock === 0 
                    ? 'Este producto está temporalmente sin stock.'
                    : 'Ya tienes todo el stock disponible en tu carrito.'
                  } Te avisaremos cuando vuelva a estar disponible.
                </p>
                <button className="notify-button">
                  <span className="notify-icon">🔔</span>
                  Notificarme cuando esté disponible
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemDetail