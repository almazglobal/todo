import React from 'react';
import './search-panel.css';

const SearchPanel = () => {
  const searchText = 'Type here to search';

  return (
    <input
      className="form-control search-panel"
      placeholder={searchText}
      type="text"
    />
  );
};

export default SearchPanel;
