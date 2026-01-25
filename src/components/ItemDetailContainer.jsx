import '../css/ItemDetail.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { getProductById } from '../data/products'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { itemId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    
    const fetchProduct = async () => {
      try {
        const data = await getProductById(itemId)
        if (data) {
          setProduct(data)
          setError(null)
        } else {
          setError('Producto no encontrado')
          setProduct(null)
        }
      } catch (err) {
        setError('Error al cargar el producto')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [itemId])

  const handleBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Cargando producto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h3>Producto no encontrado</h3>
        <p>{error || 'El producto que buscas no existe.'}</p>
        <button onClick={handleBack} className="back-button">
          Volver atrás
        </button>
      </div>
    )
  }

  return (
    <div className="item-detail-container">
      <button onClick={handleBack} className="back-button detail-back">
        ← Volver
      </button>
      <ItemDetail product={product} />
    </div>
  )
}

export default ItemDetailContainer