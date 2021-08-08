import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TodoList, TodoItem } from './Tasks.js';

function App() {
  return (
    <div className="App container">
      <header className="App-header">
        <h1>Todos</h1>
      </header>

      <TodoList />
    </div>
  );
};

export default App;
