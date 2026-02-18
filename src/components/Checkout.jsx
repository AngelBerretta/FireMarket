import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../service/ordersService'
import '../css/Checkout.css'

const Checkout = () => {
  const { items: cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    emailConfirm: ''
  })

  const [errors, setErrors] = useState({})

  // Función de validación robusta para el nombre completo
  const validateFullName = (name) => {
    const trimmedName = name.trim()
    
    // Verificar que no esté vacío
    if (!trimmedName) {
      return 'El nombre completo es requerido'
    }

    // Verificar longitud mínima (al menos 3 caracteres)
    if (trimmedName.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres'
    }

    // Verificar longitud máxima (máximo 100 caracteres)
    if (trimmedName.length > 100) {
      return 'El nombre no puede exceder 100 caracteres'
    }

    // Verificar que solo contenga letras, espacios, acentos y caracteres válidos
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/
    if (!nameRegex.test(trimmedName)) {
      return 'El nombre solo puede contener letras, espacios y guiones'
    }

    // Verificar que tenga al menos nombre y apellido (mínimo 2 palabras)
    const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0)
    if (nameParts.length < 2) {
      return 'Por favor ingresa tu nombre y apellido'
    }

    // Verificar que cada parte tenga al menos 2 caracteres
    const hasInvalidPart = nameParts.some(part => part.length < 2)
    if (hasInvalidPart) {
      return 'Cada parte del nombre debe tener al menos 2 caracteres'
    }

    // Verificar que no tenga espacios consecutivos excesivos
    if (/\s{3,}/.test(name)) {
      return 'El nombre tiene espacios excesivos'
    }

    // Verificar que no comience o termine con caracteres especiales
    if (/^[-'\s]|[-'\s]$/.test(trimmedName)) {
      return 'El nombre no puede comenzar o terminar con guiones o apóstrofes'
    }

    // Verificar que no tenga números
    if (/\d/.test(trimmedName)) {
      return 'El nombre no puede contener números'
    }

    return null 
  }

  const validateForm = () => {
    const newErrors = {}

    // Validación robusta del nombre
    const nameError = validateFullName(formData.name)
    if (nameError) {
      newErrors.name = nameError
    }

    // Validación del teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono debe tener 10 dígitos'
    }

    // Validación del email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'El email no es válido'
    }

    // Validación de confirmación de email
    if (formData.email.trim() !== formData.emailConfirm.trim()) {
      newErrors.emailConfirm = 'Los emails no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Para el campo de nombre, limpiar caracteres no válidos mientras se escribe
    let processedValue = value
    if (name === 'name') {
      // Permitir solo letras, espacios, acentos, guiones y apóstrofes
      processedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, '')
      // Limitar espacios consecutivos a máximo 2
      processedValue = processedValue.replace(/\s{3,}/g, '  ')
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) return

    if (cart.length === 0) {
      setSubmitError('El carrito está vacío.')
      return
    }

    setLoading(true)

    try {
      const orderData = {
        buyer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim()
        },
        items: cart.map(item => ({
          id: item.id,
          title: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: totalPrice
      }

      // createOrder descuenta stock primero (transacción); si falla
      // por stock insuficiente, lanza un Error con el mensaje apropiado
      const generatedOrderId = await createOrder(orderData)

      setOrderId(generatedOrderId)
      clearCart()

    } catch (error) {
      setSubmitError(error.message || 'Hubo un error al procesar tu orden. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // ── Pantalla de éxito ──────────────────────────────────────────────────────
  if (orderId) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>¡Orden creada exitosamente!</h2>
          <div className="order-id-display">
            <p>Tu número de orden es:</p>
            <h3>{orderId}</h3>
          </div>
          <p className="success-message">
            Recibirás un email de confirmación a <strong>{formData.email}</strong>
          </p>
          <div className="success-actions">
            <button onClick={() => navigate('/')} className="btn-primary">
              Volver al inicio
            </button>
            <button onClick={() => window.print()} className="btn-secondary">
              Imprimir orden
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Carrito vacío ──────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart-message">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos antes de finalizar la compra</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Ir a la tienda
          </button>
        </div>
      </div>
    )
  }

  // ── Formulario ─────────────────────────────────────────────────────────────
  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>

      <div className="checkout-content">
        {/* Resumen del carrito */}
        <div className="order-summary">
          <h3>Resumen de tu orden</h3>
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Cantidad: {item.quantity}</p>
                  <p className="item-price">${item.price.toFixed(2)} c/u</p>
                </div>
                <div className="item-total">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>

        {/* Formulario de datos del comprador */}
        <div className="checkout-form">
          <h3>Datos del comprador</h3>

          {/* Error general (stock insuficiente u otro error de red) */}
          {submitError && (
            <div className="checkout-submit-error">
              ⚠️ {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Juan Pérez García"
                maxLength={100}
                autoComplete="name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
              <span className="field-hint">Ingresa tu nombre y apellido(s)</span>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="1234567890"
                maxLength={10}
                autoComplete="tel"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
              <span className="field-hint">10 dígitos sin espacios ni guiones</span>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="ejemplo@email.com"
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="emailConfirm">Confirmar Email *</label>
              <input
                type="email"
                id="emailConfirm"
                name="emailConfirm"
                value={formData.emailConfirm}
                onChange={handleChange}
                className={errors.emailConfirm ? 'error' : ''}
                placeholder="ejemplo@email.com"
                autoComplete="email"
              />
              {errors.emailConfirm && <span className="error-message">{errors.emailConfirm}</span>}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="btn-secondary"
                disabled={loading}
              >
                Volver al carrito
              </button>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-small"></span>
                    Procesando...
                  </>
                ) : (
                  'Finalizar Compra'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout
