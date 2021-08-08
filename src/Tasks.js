import React from 'react';

const ViewType = {
  ALL: 0,
  ACTIVE: 1,
  COMPLETED: 2,
};

const DEFAULT_TASKS = [
  {
    description: "Remember the milk",
    completed: false,
  }, {
    description: "Clean the house",
    completed: true,
  }, {
    description: "Pay the bills",
    completed: false,
  },
];

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: DEFAULT_TASKS,
      viewType: ViewType.ACTIVE,
    };
  }

  addTask(event) {
    if (event.key === 'Enter') {
      const todos = this.state.todos.concat({
        completed: false,
        description: event.target.value,
      });
      this.setTodos(todos);

      // Clear input box
      event.target.value = '';
    }
  }

  completeTask(index) {
    const todos = this.state.todos.slice(0); // Clone array
    todos[index].completed = !todos[index].completed
    this.setTodos(todos);
  }

  deleteTask(index) {
    const todos = this.state.todos.slice(0);
    todos.splice(index, 1);
    this.setTodos(todos);
  }

  setTodos(todos) {
    const state = Object.assign({}, this.state, { todos: todos });
    this.setState(state);
  }

  createViewTypeSelector(type, label) {
    if (this.state.viewType === type) {
      return <button className="btn btn-primary active">{label}</button>;
    } else {
      return (
        <button className="btn btn-primary" onClick={() => this.setViewType(type)}>
          {label}
        </button>
      );
    }
  }

  setViewType(type) {
    const state = Object.assign({}, this.state, { viewType: type });
    this.setState(state);
  }

  render() {
    let filterFn, itemCountLabel;
    if (this.state.viewType === ViewType.COMPLETED) {
      filterFn = todo => todo.completed;
      itemCountLabel = 'completed';
    } else if (this.state.viewType === ViewType.ACTIVE) {
      filterFn = todo => !todo.completed;
      itemCountLabel = 'left';
    } else {
      filterFn = todo => true;
      itemCountLabel = '';
    }

    const todoListItems = this.state.todos
      // In case indices change bc of deleted tasks, re-assign indices each render
      .map((todo, index) => Object.assign({}, todo, {index: index}))
      .filter(filterFn)
      .map(todo =>
        <TodoItem
                id={todo.index}
                completed={todo.completed}
                description={todo.description}
                key={todo.index}
                completionHandler={() => this.completeTask(todo.index)}
                deletionHandler={() => this.deleteTask(todo.index)} />
      );

    return (
      <div>
        <div>
          <input type="text"
              onKeyDown={this.addTask.bind(this)}
              placeholder="What is going on?" />
        </div>

        <div className="btn-group">
          {this.createViewTypeSelector(ViewType.ALL, 'All')}
          {this.createViewTypeSelector(ViewType.ACTIVE, 'Active')}
          {this.createViewTypeSelector(ViewType.COMPLETED, 'Completed')}
        </div>

        <ul className="task-list list-group my-3">{todoListItems}</ul>

        <div>{todoListItems.length} items {itemCountLabel}</div>
      </div>
    );
  }
};

class TodoItem extends React.Component {
  render() {
    const className = 'task ' + (this.props.completed ? 'completed' : '');
    const taskId = `task-${this.props.id}`;
    return (
      <li className={"list-group-item " + className}>
        <div className="form-check align-middle">
          <input id={taskId}
              className="form-check-input"
              type="checkbox"
              checked={this.props.completed}
              onClick={this.props.completionHandler}
          />
          <label className="form-check-label" htmlFor={taskId}>{this.props.description}</label>
          <button className="float-end btn btn-danger" onClick={this.props.deletionHandler}>
            x
          </button>
        </div>
      </li>
    );
  }
};

export { TodoList, TodoItem };
