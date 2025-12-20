import './App.css'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="main-content">
        <ItemListContainer greeting="¡Bienvenido a Fire Market! Encuentra los mejores productos al mejor precio." />
      </main>
    </div>
  )
}

export default App
