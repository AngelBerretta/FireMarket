import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="page-container">
      <h2>404 - Página no encontrada</h2>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}

export default Error
