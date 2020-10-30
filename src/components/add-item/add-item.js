import React from 'react';
import './add-item.css';

const AddItem = ({ onAdd }) => {
  return (
    <div className="d-flex add-item">
      <input
        className="add-panel"
        type="text"
        placeholder="What needs to be done?"
      />
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => onAdd('New Day!!')}
      >
        Add
      </button>
    </div>
  );
};

export default AddItem;
