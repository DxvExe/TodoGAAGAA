import React from 'react';

const FilterBar = ({ currentFilter, onSelectFilter }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="filter-group">
      {filters.map((f) => (
        <button
          key={f.id}
          className={`filter-btn ${currentFilter === f.id ? 'active' : ''}`}
          onClick={() => onSelectFilter(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
