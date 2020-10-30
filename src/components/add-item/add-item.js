import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {
  state = {
    nameItem: '',
  };
  onLabelChange = (evt) => {
    this.setState({ nameItem: evt.target.value });
  };
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAdd(this.state.nameItem);
    this.setState({ nameItem: '' });
  };
  render() {
    return (
      <form className="d-flex add-item" onSubmit={this.onSubmit}>
        <input
          className="form-control add-panel"
          type="text"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.nameItem}
        />
        <button className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}
