import '../css/ItemDetail.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { getProductById } from '../service/firestoreService'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { itemId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    const fetchProduct = async () => {
      try {
        // Consultar UN SOLO documento de Firestore por ID
        const data = await getProductById(itemId)
        
        if (data) {
          setProduct(data)
        } else {
          setError('Producto no encontrado')
          setProduct(null)
        }
      } catch (err) {
        setError('Error al cargar el producto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [itemId]) // Se ejecuta cada vez que cambia el ID del producto

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
