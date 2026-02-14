import { Link } from 'react-router-dom'
import '../css/Footer.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Columna 1: Brand */}
        <div className="footer-column">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="footer-fire">🔥</span>
              Fire Market
            </h3>
            <p className="footer-tagline">
              Tu tienda de confianza para productos de calidad
            </p>
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon facebook" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="social-icon instagram" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon twitter" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon youtube" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className="footer-column">
          <h4 className="footer-title">Navegación</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/category/all">Todos los Productos</Link></li>
            <li><Link to="/about">Nosotros</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Categorías */}
        <div className="footer-column">
          <h4 className="footer-title">Categorías</h4>
          <ul className="footer-links">
            <li><Link to="/category/electronics">Electrónica</Link></li>
            <li><Link to="/category/clothing">Ropa</Link></li>
            <li><Link to="/category/home">Hogar</Link></li>
            <li><Link to="/category/sports">Deportes</Link></li>
          </ul>
        </div>

        {/* Columna 4: Información */}
        <div className="footer-column">
          <h4 className="footer-title">Información</h4>
          <ul className="footer-links">
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Envíos y Devoluciones</a></li>
            <li><a href="#">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        {/* Columna 5: Newsletter */}
        <div className="footer-column">
          <h4 className="footer-title">Newsletter</h4>
          <p className="footer-newsletter-text">
            Suscríbete para recibir ofertas exclusivas
          </p>
          <form className="footer-newsletter-form">
            <input 
              type="email" 
              placeholder="tu@email.com" 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Suscribirse
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © {currentYear} Fire Market - Todos los derechos reservados
          </p>
          <div className="footer-payment">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">🏦</span>
            <span className="payment-icon">💵</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
