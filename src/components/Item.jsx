import '../css/Item.css'
import { Link } from 'react-router-dom'

const Item = ({ product }) => {
  return (
    <div className="item-card">
      <div className="item-image-container">
        <img src={product.image} alt={product.name} className="item-image" />
        <div className="item-category-badge">
          {product.category}
        </div>
      </div>
      
      <div className="item-content">
        <h3 className="item-title">{product.name}</h3>
        <p className="item-description">{product.description.substring(0, 100)}...</p>
        
        <div className="item-footer">
          <div className="item-price">
            <span className="price-amount">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="item-stock">
            {product.stock > 0 ? (
              <span className="stock-available">Stock: {product.stock}</span>
            ) : (
              <span className="stock-out">Sin stock</span>
            )}
          </div>
        </div>
        
        <Link to={`/item/${product.id}`} className="item-detail-button">
          <span>Ver Detalles</span>
          <span className="button-icon">🔥</span>
        </Link>
      </div>
    </div>
  )
}

export default Item