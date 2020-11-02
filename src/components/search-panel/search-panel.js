import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: '',
  };
  searchText = (e) => {
    this.setState(() => {
      return {
        term: e.target.value,
      };
    });
    this.props.onSearchText(e.target.value);
  };
  render() {
    return (
      <input
        className="form-control search-panel"
        placeholder="Type here to search"
        type="text"
        value={this.state.term}
        onChange={this.searchText}
      />
    );
  }
}
