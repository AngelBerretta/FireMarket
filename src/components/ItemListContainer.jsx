import '../css/ItemListContainer.css'
import PropTypes from 'prop-types'

const ItemListContainer = ({ greeting }) => {
  return (
    <div className="item-list-container">
      <div className="hero-section">
        <h2 className="hero-title">Fire Market</h2>
        <p className="hero-subtitle">Tu destino para las mejores ofertas</p>
      </div>
      
      <div className="greeting-section">
        <p className="greeting-text">{greeting}</p>
      </div>
      
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔥</div>
            <h3>Ofertas Exclusivas</h3>
            <p>Los mejores precios en productos seleccionados</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Envío Rápido</h3>
            <p>Entrega en 24-48 horas en compras mayores a $50</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Compra Segura</h3>
            <p>Protección de datos y transacciones 100% seguras</p>
          </div>
        </div>
      </div>
      
      <div className="coming-soon">
        <h3>Próximamente nuestro catálogo de productos</h3>
        <p>Estamos preparando las mejores categorías para ti</p>
      </div>
    </div>
  )
}

ItemListContainer.propTypes = {
  greeting: PropTypes.string.isRequired
}

export default ItemListContainer