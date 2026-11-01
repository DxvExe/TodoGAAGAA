import React from 'react';

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="task-list-section">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-line title" />
          <div className="skeleton-line desc" />
          <div className="skeleton-line meta" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
