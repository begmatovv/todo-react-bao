import React, { useState } from "react";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Playing cards", completed: false },
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: todo, completed: false },
      ]);
      setTodo("");
    }
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <header>
      <div className="container">
        <div className="header-title">
          <h2>Todo</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="add new todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </form>
        <ul>
          {todos.map((item) => (
            <li key={item.id}>
              <div className="todo-wrapper">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodo(item.id)}
                />
                <p
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </p>
              </div>
              <button className="delete">X</button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Todos;
