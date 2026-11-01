import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSubmit, task = null, isSubmitting = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Please provide a task title.');
      return;
    }

    if (trimmedTitle.length > 150) {
      setError('Title cannot exceed 150 characters.');
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim()
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              type="text"
              className={`form-control ${error ? 'has-error' : ''}`}
              placeholder="e.g. Finish chemistry project"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              autoFocus
              disabled={isSubmitting}
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="task-desc">Description (optional)</label>
            <textarea
              id="task-desc"
              rows={4}
              className="form-control"
              placeholder="Add extra context, links, or sub-points..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
