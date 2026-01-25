import '../css/ItemList.css'
import Item from './Item'

const ItemList = ({ products }) => {
  return (
    <div className="item-list">
      <div className="products-grid">
        {products.map(product => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ItemList