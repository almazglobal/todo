import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AddItem from '../add-item';
import ItemStatusFilter from '../item-status-filter';
import './app.css';

export default class App extends Component {
  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, done: false, id: 1 },
      { label: 'Make Awesome App', important: true, done: false, id: 2 },
      { label: 'Have a lunch', important: false, done: false, id: 3 },
    ],
    modeDisplay: 'All',
    term: '',
  };
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      return { todoData: [...before, ...after] };
    });
  };
  generateID = (todoData) => {
    if (todoData.length === 0) return 1;
    const arrID = todoData.map((el) => el.id);
    return Math.max(...arrID) + 1;
  };
  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newId = this.generateID(todoData);
      const newItem = { label: text, important: false, id: newId };
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const item = { ...arr[idx], [propName]: !oldItem[propName] };
    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);
    return [...before, item, ...after];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  countDone = (arr) => {
    return arr.reduce((acc, el) => (el.done ? ++acc : acc), 0);
  };

  changeStatus = (items, status) => {
    let newArray;
    if (status === 'All') {
      newArray = items;
    }
    if (status === 'Active') {
      newArray = items.filter((el) => !el.done);
    }
    if (status === 'Done') {
      newArray = items.filter((el) => el.done);
    }
    return newArray;
  };

  onChangeStatus = (modeDisplay) => {
    this.setState({ modeDisplay });
  };

  searchItems = (items, text) => {
    if (!text) return items;
    return items.filter((el) =>
      el.label.toLowerCase().includes(text.toLowerCase())
    );
  };
  changeStateTerm = (term) => {
    this.setState({ term });
  };
  render() {
    const { todoData, modeDisplay, term } = this.state;
    const modeDisplayItems = this.changeStatus(todoData, modeDisplay);
    const showFilterItems = this.searchItems(modeDisplayItems, term);
    const done = this.countDone(todoData);
    const toDo = todoData.length - done;
    return (
      <div className="todo-app">
        <AppHeader toDo={toDo} done={done} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchText={this.changeStateTerm} />
          <ItemStatusFilter
            onChangeStatus={this.onChangeStatus}
            filter={modeDisplay}
          />
        </div>

        <TodoList
          todos={showFilterItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onAdd={this.addItem} />
      </div>
    );
  }
}
