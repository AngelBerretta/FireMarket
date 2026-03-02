import '../css/CartView.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ConfirmDialog from './ConfirmDialog'
import { Flame, X, Truck, ShoppingBag } from 'lucide-react'

const CartView = () => {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, itemId: null, itemName: '' })

  const handleCheckout = () => {
    navigate('/checkout')
  }

  const handleContinueShopping = () => {
    navigate('/')
  }

  const handleRemoveClick = (id, name) => {
    setConfirmDialog({ isOpen: true, itemId: id, itemName: name })
  }

  const handleConfirmRemove = () => {
    if (confirmDialog.itemId) {
      removeItem(confirmDialog.itemId)
    }
    setConfirmDialog({ isOpen: false, itemId: null, itemName: '' })
  }

  const handleCancelRemove = () => {
    setConfirmDialog({ isOpen: false, itemId: null, itemName: '' })
  }

  return (
    <div className="cart-view">

      {/* Header */}
      <div className="cart-view-header">
        <h2 className="cart-view-title">
          <Flame className="cart-view-fire" size={28} strokeWidth={2.5} />
          Tu Carrito
        </h2>
        {items.length > 0 && (
          <button className="cart-clear-button" onClick={clearCart}>
            Limpiar todo
          </button>
        )}
      </div>

      {/* Items List */}
      <div className="cart-items-list">
        {items.map(item => {
          const atStockLimit = item.quantity >= (item.stock ?? Infinity)

          return (
            <div key={item.id} className="cart-item">

              {/* Imagen */}
              <div className="cart-item-image-wrapper">
                <img src={item.image} alt={item.name} className="cart-item-image" loading="lazy" />
              </div>

              {/* Info */}
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-unit-price">${item.price.toFixed(2)} c/u</p>
                
                {atStockLimit && (
                  <p className="cart-item-stock-limit">Máximo disponible</p>
                )}
              </div>

              {/* Controles de cantidad */}
              <div className="cart-item-controls">
                <button
                  className="cart-qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="cart-qty-number">{item.quantity}</span>
                <button
                  className="cart-qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={atStockLimit}
                  aria-label="Aumentar cantidad"
                  title={atStockLimit ? 'No hay más stock disponible' : ''}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="cart-item-subtotal">
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>

              {/* Botón eliminar */}
              <button
                className="cart-item-remove"
                onClick={() => handleRemoveClick(item.id, item.name)}
                aria-label={`Eliminar ${item.name}`}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="cart-view-summary">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Total</span>
          <span className="cart-summary-total">${totalPrice.toFixed(2)}</span>
        </div>

        {totalPrice > 50 && (
          <p className="cart-free-shipping">
            <Truck className="cart-free-shipping-icon" size={20} strokeWidth={2} />
            ¡Envío gratis en esta compra!
          </p>
        )}

        <button className="cart-checkout-button" onClick={handleCheckout}>
          <span>Finalizar compra</span>
          <Flame className="cart-checkout-fire" size={20} strokeWidth={2.5} />
        </button>

        <button className="cart-continue-shopping" onClick={handleContinueShopping}>
          <ShoppingBag className="cart-continue-icon" size={20} strokeWidth={2} />
          <span>Seguir viendo productos</span>
        </button>
      </div>

      {/* Dialog de confirmación */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
        productName={confirmDialog.itemName}
      />
    </div>
  )
}

export default CartView