import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
}

const App: React.FC<Props> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: newTodo.trim(), completed: false },
    ]);
    setNewTodo('');
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    setFilter(filter);
  };

  const handleClearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const filteredTodos = filter === 'all'
    ? todos
    : filter === 'active'
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  return (
    <div className={`todo-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="todo-header">
        <div className="mode-toggle" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </div>
        <h1>Todo App</h1>
      </div>
      <div className="menu-options" style={{ display: 'flex' }}>
        <div className={`menu-option ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>
          All
        </div>
        <div className={`menu-option ${filter === 'active' ? 'active' : ''}`} onClick={() => handleFilterChange('active')}>
          Active
        </div>
        <div className={`menu-option ${filter === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}>
          Completed
        </div>
        <div className="menu-option" onClick={handleClearCompleted}>
          Clear Completed
        </div>
      </div>
      <div className="tasks-section">
        <div className="todo-input-container">
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />

          <button className="todo-button" onClick={addTodo}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '0px' }} />
          </button>
        </div>
        {filteredTodos.map((todo) => (
          <div key={todo.id} className={`task-card ${todo.completed ? 'completed' : ''}`}>
            <div>{todo.text}</div>
            <div className="task-actions">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="checkmark"></span>
              </label>
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => removeTodo(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

