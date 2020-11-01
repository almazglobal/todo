import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AddItem from '../add-item';
import ItemStatusFilter from '../item-status-filter';
import './app.css';

export default class App extends Component {
  data = [
    { label: 'Drink Coffee', important: false, done: false, id: 1 },
    { label: 'Make Awesome App', important: true, done: false, id: 2 },
    { label: 'Have a lunch', important: false, done: false, id: 3 },
  ];
  state = {
    todoData: this.data,
    modeDisplay: 'Done',
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

  changeStatus = (modeDisplay) => {
    this.setState(({ todoData }) => {
      let newArray;
      if (modeDisplay === 'All') {
        newArray = this.data;
      }
      if (modeDisplay === 'Active') {
        newArray = todoData.filter((el) => !el.done);
      }
      if (modeDisplay === 'Done') {
        newArray = todoData.filter((el) => el.done);
      }
      return { todoData: newArray };
    });
  };

  onChangeStatus = (status) => {
    this.setState(() => {
      return { modeDisplay: status };
    });
  };

  render() {
    const { todoData, modeDisplay } = this.state;
    this.changeStatus(modeDisplay);
    const done = this.countDone(todoData);
    const toDo = todoData.length - done;
    return (
      <div className="todo-app">
        <AppHeader toDo={toDo} done={done} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter onChangeStatus={this.onChangeStatus} />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onAdd={this.addItem} />
      </div>
    );
  }
}
