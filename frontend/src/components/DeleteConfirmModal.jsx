import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle, isDeleting = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={22} color="#ef4444" />
            <h2>Delete Task</h2>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Are you sure you want to delete <strong>"{taskTitle}"</strong>? This action cannot be undone.
          </p>

          <div className="modal-actions" style={{ marginTop: '20px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
