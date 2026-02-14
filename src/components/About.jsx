import '../css/About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>
          <span className="fire-icon">🔥</span>
          Sobre Fire Market
        </h1>
        <p className="about-tagline">Tu tienda de confianza desde 2023</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="section-icon">🎯</div>
          <h2>Nuestra Misión</h2>
          <p>
            En Fire Market nos dedicamos a ofrecer productos de calidad a los mejores precios.
            Creemos que cada cliente merece una experiencia de compra excepcional, con productos
            cuidadosamente seleccionados y un servicio al cliente de primera.
          </p>
        </section>

        <section className="about-section">
          <div className="section-icon">⭐</div>
          <h2>¿Por qué elegirnos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Envío Rápido</h3>
              <p>Entrega en 24-48 horas en toda la región</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Pago Seguro</h3>
              <p>Plataforma de pagos certificada y protegida</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Devoluciones Fáciles</h3>
              <p>30 días para devolver tu producto sin preguntas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Soporte 24/7</h3>
              <p>Estamos aquí para ayudarte cuando lo necesites</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-icon">📊</div>
          <h2>Nuestros Números</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Clientes Felices</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Productos</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15K+</div>
              <div className="stat-label">Órdenes Completadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Calificación Promedio</div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="section-icon">🌱</div>
          <h2>Compromiso con el Medio Ambiente</h2>
          <p>
            Nos preocupamos por el planeta. Utilizamos empaques reciclables y trabajamos
            con proveedores que comparten nuestros valores de sostenibilidad. Cada compra
            en Fire Market contribuye a un futuro más verde.
          </p>
        </section>

        <section className="about-cta">
          <h2>¿Listo para comenzar?</h2>
          <p>Explora nuestro catálogo y encuentra lo que necesitas</p>
          <a href="/" className="cta-button">
            Ver Productos 🔥
          </a>
        </section>
      </div>
    </div>
  )
}

export default About
