import '../css/NavBar.css'
import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <div className="logo-container">
              <span className="fire-logo">🔥</span>
              <h1>FIRE MARKET</h1>
            </div>
          </a>
        </div>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/">Inicio</a>
          </li>
          <li className="navbar-item">
            <a href="/category/electronics">Electrónica</a>
          </li>
          <li className="navbar-item">
            <a href="/category/clothing">Ropa</a>
          </li>
          <li className="navbar-item">
            <a href="/category/home">Hogar</a>
          </li>
          <li className="navbar-item">
            <a href="/category/sports">Deportes</a>
          </li>
          <li className="navbar-item">
            <a href="/about">Nosotros</a>
          </li>
          <li className="navbar-item">
            <a href="/contact">Contacto</a>
          </li>
        </ul>
        
        <div className="navbar-cart">
          <CartWidget />
        </div>
      </div>
    </nav>
  )
}

export default NavBar