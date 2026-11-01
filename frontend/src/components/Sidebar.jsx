import React from 'react';
import { CheckSquare, ListTodo, Clock, CheckCircle2, Sliders } from 'lucide-react';

const Sidebar = ({ currentFilter, onSelectFilter, counts }) => {
  const navItems = [
    { id: 'all', label: 'All Tasks', icon: ListTodo, count: counts.total },
    { id: 'pending', label: 'Pending', icon: Clock, count: counts.pending },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: counts.completed }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <CheckSquare size={20} />
        </div>
        <span className="logo-text">TaskFlow</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentFilter === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectFilter(item.id)}
            >
              <div className="nav-item-left">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              <span className="nav-badge">{item.count}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-settings">
          <Sliders size={16} />
          <span>Workspace Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
