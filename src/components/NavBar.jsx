import '../css/NavBar.css'
import CartWidget from './CartWidget'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

const NavBar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const categories = [
    { 
      id: 'electronics', 
      name: 'Electrónica', 
      icon: '📱', 
      color: '#4A90E2',
      description: 'Smartphones y laptops'
    },
    { 
      id: 'clothing', 
      name: 'Ropa', 
      icon: '👕', 
      color: '#FF6B8B',
      description: 'Moda y vestimenta'
    },
    { 
      id: 'home', 
      name: 'Hogar', 
      icon: '🏠', 
      color: '#50E3C2',
      description: 'Decoración y muebles'
    },
    { 
      id: 'sports', 
      name: 'Deportes', 
      icon: '⚽', 
      color: '#F5A623',
      description: 'Equipamiento deportivo'
    }
  ]

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen)
  }

  // Cerrar dropdown al hacer clic fuera
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={() => setCategoriesOpen(false)}>
            <div className="logo-container">
              <span className="fire-logo">🔥</span>
              <h1>FIRE MARKET</h1>
            </div>
          </Link>
        </div>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" onClick={() => setCategoriesOpen(false)}>
              <span className="nav-icon">🏠</span>
              Inicio
            </Link>
          </li>
          
          {/* Menú desplegable de categorías */}
          <li className="navbar-item dropdown">
            <button 
              ref={buttonRef}
              className="dropdown-toggle"
              onClick={toggleCategories}
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setTimeout(() => {
                if (!dropdownRef.current?.matches(':hover')) {
                  setCategoriesOpen(false)
                }
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
                  {categories.map(category => (
                    <li key={category.id} className="dropdown-item">
                      <Link 
                        to={`/category/${category.id}`}
                        className="dropdown-link"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <div 
                          className="category-icon-container"
                          style={{ background: `${category.color}20` }}
                        >
                          <span 
                            className="category-icon"
                            style={{ color: category.color }}
                          >
                            {category.icon}
                          </span>
                        </div>
                        
                        <div className="category-content">
                          <span className="category-name">{category.name}</span>
                          <span className="category-description">{category.description}</span>
                        </div>
                        
                        <span className="category-arrow">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="dropdown-divider"></div>
                
                <Link 
                  to="/category/all" 
                  className="dropdown-all"
                  onClick={() => setCategoriesOpen(false)}
                >
                  <span>Ver Catálogo Completo</span>
                  <span className="all-icon">🚀</span>
                </Link>
              </div>
            )}
          </li>
          
          <li className="navbar-item">
            <Link to="/about" onClick={() => setCategoriesOpen(false)}>
              <span className="nav-icon">👥</span>
              Nosotros
            </Link>
          </li>
          
          <li className="navbar-item">
            <Link to="/contact" onClick={() => setCategoriesOpen(false)}>
              <span className="nav-icon">📞</span>
              Contacto
            </Link>
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