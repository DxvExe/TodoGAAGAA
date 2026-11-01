import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ search, onSearchChange, onClearSearch }) => {
  return (
    <div className="search-box">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks by title or description..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {search && (
        <button
          className="search-clear"
          onClick={onClearSearch}
          title="Clear search"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
