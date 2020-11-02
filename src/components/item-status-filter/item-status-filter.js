import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Done', label: 'Done' },
  ];

  render() {
    const { filter, onChangeStatus } = this.props;
    const elements = this.buttons.map(({ name, label }) => {
      const isActive = name === filter;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          key={name}
          onClick={() => onChangeStatus(name)}
        >
          {label}
        </button>
      );
    });

    return <div className="btn-group item-status-filter">{elements}</div>;
  }
}
