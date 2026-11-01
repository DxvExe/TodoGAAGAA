import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';

const EmptyState = ({ onAddNew, isFiltered = false }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrap">
        <CheckSquare size={32} />
      </div>
      <h3>{isFiltered ? 'No tasks found' : 'No tasks created yet'}</h3>
      <p>
        {isFiltered
          ? 'Try adjusting your search keywords or switching filters to see other tasks.'
          : 'Stay organized by tracking your daily goals, homework, and projects.'}
      </p>
      {!isFiltered && (
        <button className="btn-primary" onClick={onAddNew}>
          <Plus size={18} />
          <span>Create your first task</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
