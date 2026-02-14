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

  // Calcular stock disponible restando lo que ya está en el carrito
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
      setAdded(true) // 🔥 Oculta ItemCount después de agregar
    } else {
      setStockError(result.message)
    }
  }

  const handleCloseToast = () => {
    setShowToast(false)
  }

  return (
    <>
      {/* Notificación Toast */}
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

            {/* Características destacadas - ahora debajo de la imagen */}
            <div className="detail-features-cards">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">🚚</span>
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Envío Gratis</h4>
                  <p className="feature-text">Compras mayores a $50</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">🛡️</span>
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Garantía</h4>
                  <p className="feature-text">12 meses de cobertura</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">↩️</span>
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">Devolución</h4>
                  <p className="feature-text">30 días sin preguntas</p>
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

