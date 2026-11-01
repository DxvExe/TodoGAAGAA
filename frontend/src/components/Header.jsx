import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ onOpenCreateModal }) => {
  return (
    <header className="top-header">
      <div className="header-greeting">
        <h1>Overview</h1>
        <p>Keep track of your day-to-day progress and priorities.</p>
      </div>
      <div className="header-actions">
        <button className="btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
