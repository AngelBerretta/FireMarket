import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/about" element={<div className="page-container"><h2>Sobre Nosotros</h2><p>Fire Market es tu tienda online confiable desde 2023.</p></div>} />
            <Route path="/contact" element={<div className="page-container"><h2>Contacto</h2><p>Email: contacto@firemarket.com</p></div>} />
            <Route path="*" element={<div className="page-container"><h2>404 - Página no encontrada</h2><p>La página que buscas no existe.</p></div>} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© 2026 Fire Market - Todos los derechos reservados</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
