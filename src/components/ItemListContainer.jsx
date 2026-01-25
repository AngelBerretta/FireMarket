import '../css/ItemListContainer.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'
import { getProductsByCategory } from '../data/products'

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    
    const fetchProducts = async () => {
      try {
        const category = categoryId || 'all'
        const data = await getProductsByCategory(category)
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los productos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    )
  }

  const getCategoryTitle = () => {
    switch(categoryId) {
      case 'electronics':
        return 'Electrónica'
      case 'clothing':
        return 'Ropa'
      case 'home':
        return 'Hogar'
      case 'sports':
        return 'Deportes'
      case 'all':
        return 'Todos los Productos'
      default:
        return 'Todos los Productos'
    }
  }

  const categoryTitle = getCategoryTitle()

  return (
    <div className="item-list-container">
      <div className="category-header">
        <h2 className="category-title">
          <span className="category-icon">🔥</span> {categoryTitle}
        </h2>
        <p className="category-count">{products.length} productos encontrados</p>
      </div>
      
      {products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <div className="no-products">
          <h3>No hay productos en esta categoría</h3>
          <p>Prueba con otra categoría o vuelve al inicio</p>
        </div>
      )}
    </div>
  )
}

export default ItemListContainer