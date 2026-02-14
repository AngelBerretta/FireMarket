import '../css/NavBar.css'
import CartWidget from './CartWidget'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

const NavBar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef  = useRef(null)

  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const categories = [
    { id: 'electronics', name: 'Electrónica',  icon: '📱', color: '#4A90E2', description: 'Smartphones y laptops' },
    { id: 'clothing',    name: 'Ropa',         icon: '👕', color: '#FF6B8B', description: 'Moda y vestimenta'     },
    { id: 'home',        name: 'Hogar',        icon: '🏠', color: '#50E3C2', description: 'Decoración y muebles'  },
    { id: 'sports',      name: 'Deportes',     icon: '⚽', color: '#F5A623', description: 'Equipamiento deportivo' }
  ]

  // ── cerrar dropdown desktop al hacer clic fuera ────────────
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)) {
        setCategoriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ── cerrar menu mobile cuando cambia la ruta ───────────────
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // ── bloquear scroll del body cuando el menu mobile está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className="navbar">
      <div className="navbar-container">

        
        <div className="navbar-logo">
          <Link to="/" onClick={() => { setCategoriesOpen(false); setMenuOpen(false) }}>
            <div className="logo-container">
              <span className="fire-logo">🔥</span>
              <h1>FIRE MARKET</h1>
            </div>
          </Link>
        </div>

        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/" end onClick={() => setCategoriesOpen(false)}>
              <span className="nav-icon">🏠</span>
              Inicio
            </NavLink>
          </li>

          {/* Dropdown categorías desktop */}
          <li className="navbar-item dropdown">
            <button
              ref={buttonRef}
              className="dropdown-toggle"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setTimeout(() => {
                if (!dropdownRef.current?.matches(':hover')) setCategoriesOpen(false)
              }, 100)}
              aria-expanded={categoriesOpen}
              aria-label="Menú de categorías"
            >
              <span className="dropdown-icon">📋</span>
              Productos
              <span className={`dropdown-arrow ${categoriesOpen ? 'open' : ''}`}>▼</span>
            </button>

            {categoriesOpen && (
              <div
                ref={dropdownRef}
                className="dropdown-menu"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <div className="dropdown-header">
                  <span className="dropdown-fire">🔥</span>
                  <h3>Explora por Categoría</h3>
                </div>
                <div className="dropdown-divider"></div>
                <ul className="dropdown-list">
                  {categories.map(cat => (
                    <li key={cat.id} className="dropdown-item">
                      <Link
                        to={`/category/${cat.id}`}
                        className="dropdown-link"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <div className="category-icon-container" style={{ background: `${cat.color}20` }}>
                          <span className="category-icon" style={{ color: cat.color }}>{cat.icon}</span>
                        </div>
                        <div className="category-content">
                          <span className="category-name">{cat.name}</span>
                          <span className="category-description">{cat.description}</span>
                        </div>
                        <span className="category-arrow">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="dropdown-divider"></div>
                <Link to="/category/all" className="dropdown-all" onClick={() => setCategoriesOpen(false)}>
                  <span>Ver Catálogo Completo</span>
                  <span className="all-icon">🚀</span>
                </Link>
              </div>
            )}
          </li>

          <li className="navbar-item">
            <NavLink to="/about" onClick={() => setCategoriesOpen(false)}>
              <span className="nav-icon">👥</span>
              Nosotros
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/contact" onClick={() => setCategoriesOpen(false)}>
              <span className="nav-icon">📞</span>
              Contacto
            </NavLink>
          </li>
        </ul>

        
        <div className="navbar-cart">
          <CartWidget />
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'active' : ''}`}></span>
        </button>
      </div>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      <aside className={`mobile-menu ${menuOpen ? 'open' : ''}`} inert={!menuOpen}>

        <div className="mobile-menu-header">
          <span className="mobile-menu-title">
            <span className="mobile-fire">🔥</span> FIRE MARKET
          </span>
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">✕</button>
        </div>

        <div className="mobile-menu-cart">
          <CartWidget />
        </div>

        <nav className="mobile-menu-nav">
          <NavLink to="/" end className="mobile-nav-link">
            <span className="mobile-nav-icon">🏠</span>
            <span>Inicio</span>
          </NavLink>

          {/* Categorías expandidas directamente (sin dropdown) */}
          <div className="mobile-nav-section">
            <span className="mobile-nav-section-title">
              <span className="mobile-nav-icon">📋</span>
              Productos
            </span>
            <div className="mobile-nav-categories">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="mobile-nav-category"
                >
                  <div className="mobile-cat-icon-wrap" style={{ background: `${cat.color}20` }}>
                    <span style={{ color: cat.color }}>{cat.icon}</span>
                  </div>
                  <div className="mobile-cat-text">
                    <span className="mobile-cat-name">{cat.name}</span>
                    <span className="mobile-cat-desc">{cat.description}</span>
                  </div>
                </Link>
              ))}
              <Link to="/category/all" className="mobile-nav-link mobile-nav-all">
                <span className="mobile-nav-icon">🚀</span>
                <span>Ver Catálogo Completo</span>
              </Link>
            </div>
          </div>

          <NavLink to="/about" className="mobile-nav-link">
            <span className="mobile-nav-icon">👥</span>
            <span>Nosotros</span>
          </NavLink>
          <NavLink to="/contact" className="mobile-nav-link">
            <span className="mobile-nav-icon">📞</span>
            <span>Contacto</span>
          </NavLink>
        </nav>
      </aside>
    </nav>
  )
}

export default NavBar
