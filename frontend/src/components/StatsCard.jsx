import React from 'react';
import { ListTodo, CheckCircle2, Clock } from 'lucide-react';

const StatsCard = ({ total = 0, completed = 0, pending = 0 }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <span>Total Tasks</span>
          <h3>{total}</h3>
        </div>
        <div className="stat-icon blue">
          <ListTodo size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span>Pending</span>
          <h3>{pending}</h3>
        </div>
        <div className="stat-icon amber">
          <Clock size={22} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span>Completed</span>
          <h3>{completed}</h3>
        </div>
        <div className="stat-icon green">
          <CheckCircle2 size={22} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
