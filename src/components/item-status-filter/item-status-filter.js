import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {
  state = {
    statusButtons: [
      { name: 'All', status: 'btn-info', id: 1 },
      { name: 'Active', status: 'btn-outline-secondary', id: 2 },
      { name: 'Done', status: 'btn-outline-secondary', id: 3 },
    ],
  };

  changeStatus = (id) => {
    this.setState(({ statusButtons }) => {
      const idx = statusButtons.findIndex((el) => el.id === id);
      const newArray = statusButtons.map((el, ind) => {
        if (idx === ind) {
          this.props.onChangeStatus(el.name);
          return { ...statusButtons[ind], status: 'btn-info' };
        } else
          return { ...statusButtons[ind], status: 'btn-outline-secondary' };
      });
      return {
        statusButtons: newArray,
      };
    });
  };

  render() {
    const { statusButtons } = this.state;
    const elements = statusButtons.map((el) => {
      return (
        <button
          type="button"
          className={`btn ${el.status}`}
          key={el.id}
          onClick={() => this.changeStatus(el.id)}
        >
          {el.name}
        </button>
      );
    });

    return <div className="btn-group item-status-filter">{elements}</div>;
  }
}
