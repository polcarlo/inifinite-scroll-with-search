import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="search-bar"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
