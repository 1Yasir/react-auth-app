import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-bar">
      <div>
        <input
          type="text"
          placeholder="Job title or skill"
          value={searchQuery.title}
          onChange={(e) => onSearchChange('title', e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="City, state/province or country"
          value={searchQuery.location}
          onChange={(e) => onSearchChange('location', e.target.value)}
        />
      </div>
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
