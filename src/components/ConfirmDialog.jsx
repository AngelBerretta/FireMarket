import '../css/ConfirmDialog.css'

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, productName }) => {
  if (!isOpen) return null

  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-header">
          <span className="confirm-dialog-icon">⚠️</span>
          <h3 className="confirm-dialog-title">Confirmar eliminación</h3>
        </div>
        
        <div className="confirm-dialog-body">
          <p className="confirm-dialog-message">
            ¿Estás seguro de que deseas eliminar{' '}
            <strong className="confirm-dialog-product">{productName}</strong>{' '}
            de tu carrito?
          </p>
        </div>
        
        <div className="confirm-dialog-actions">
          <button 
            className="confirm-dialog-cancel" 
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button 
            className="confirm-dialog-confirm" 
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
