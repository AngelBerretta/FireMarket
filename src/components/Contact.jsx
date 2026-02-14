import { useState } from 'react'
import '../css/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    
    // Reset form después de 3 segundos
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>
          <span className="contact-icon">📧</span>
          Contáctanos
        </h1>
        <p className="contact-tagline">Estamos aquí para ayudarte</p>
      </div>

      <div className="contact-content">
        {/* Información de contacto */}
        <div className="contact-info">
          <h2>Información de Contacto</h2>
          
          <div className="info-card">
            <div className="info-icon">📍</div>
            <div className="info-details">
              <h3>Dirección</h3>
              <p>Av. Principal 1234<br />Buenos Aires, Argentina</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <div className="info-details">
              <h3>Email</h3>
              <p>contacto@firemarket.com<br />soporte@firemarket.com</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📱</div>
            <div className="info-details">
              <h3>Teléfono</h3>
              <p>+54 11 1234-5678<br />Lun - Vie: 9:00 - 18:00</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">💬</div>
            <div className="info-details">
              <h3>Redes Sociales</h3>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="contact-form-section">
          <h2>Envíanos un Mensaje</h2>
          
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>¡Mensaje Enviado!</h3>
              <p>Gracias por contactarnos. Te responderemos pronto.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Asunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button type="submit" className="submit-button">
                Enviar Mensaje 🔥
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-grid">
          <div className="faq-card">
            <h3>¿Cuál es el tiempo de entrega?</h3>
            <p>Entregamos en 24-48 horas hábiles en toda la región metropolitana.</p>
          </div>
          <div className="faq-card">
            <h3>¿Aceptan devoluciones?</h3>
            <p>Sí, tienes 30 días para devolver cualquier producto sin preguntas.</p>
          </div>
          <div className="faq-card">
            <h3>¿Cómo puedo rastrear mi pedido?</h3>
            <p>Te enviaremos un email con el número de seguimiento una vez despachado.</p>
          </div>
          <div className="faq-card">
            <h3>¿Qué métodos de pago aceptan?</h3>
            <p>Aceptamos tarjetas de crédito, débito, transferencias y efectivo.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
