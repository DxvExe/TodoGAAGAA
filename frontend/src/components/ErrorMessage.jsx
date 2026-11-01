import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-banner">
      <div className="error-banner-content">
        <AlertCircle size={20} />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button className="btn-secondary" onClick={onRetry} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
          <RotateCcw size={14} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
