import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={() => onFilterChange('remote')}
          /> Remote Jobs (24)
        </label>
      </div>
      <h4>Job Type</h4>
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.contract}
            onChange={() => onFilterChange('contract')}
          /> Contract (17)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={filters.fullTime}
            onChange={() => onFilterChange('fullTime')}
          /> Full time (100)
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
