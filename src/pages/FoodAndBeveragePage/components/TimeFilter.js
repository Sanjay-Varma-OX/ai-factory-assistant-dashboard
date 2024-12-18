import React from 'react';

export function TimeFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="flex gap-2">
      {['1M', '3M', '6M', 'All'].map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={currentFilter === filter ? "px-4 py-2 rounded bg-blue-600 text-white" : "px-4 py-2 rounded bg-gray-200"}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}