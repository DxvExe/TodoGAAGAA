import React from 'react';
import { Check, Edit2, Trash2, Calendar } from 'lucide-react';
import { formatRelativeTime } from '../utils/formatDate';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isCompleted = task.completed;
  const taskId = task.id || task._id;

  return (
    <article className={`task-card ${isCompleted ? 'is-completed' : ''}`}>
      <div className="task-checkbox-container">
        <button
          type="button"
          className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleComplete(taskId, !isCompleted)}
          aria-label={isCompleted ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {isCompleted && <Check size={14} strokeWidth={3} />}
        </button>
      </div>

      <div className="task-body">
        <h3 className={`task-title ${isCompleted ? 'completed' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className={`task-desc ${isCompleted ? 'completed' : ''}`}>
            {task.description}
          </p>
        )}
        <div className="task-meta">
          <div className="task-meta-item">
            <Calendar size={13} />
            <span>{formatRelativeTime(task.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn-icon"
          onClick={() => onEdit(task)}
          title="Edit task"
          aria-label="Edit task"
        >
          <Edit2 size={16} />
        </button>
        <button
          type="button"
          className="btn-icon delete"
          onClick={() => onDelete(task)}
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
