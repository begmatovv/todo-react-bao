import React, { useState } from "react";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [incompleteTodos, setIncompleteTodos] = useState(0);
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: todo, completed: false },
      ]);
      setTodo("");
      setIncompleteTodos(incompleteTodos + 1);
    }
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    setIncompleteTodos(
      todos.find((todo) => todo.id === id && !todo.completed)
        ? incompleteTodos - 1
        : incompleteTodos + 1
    );
  }

  function deleteTodo(id) {
    const deletedTodo = todos.find((todo) => todo.id === id);
    setTodos(todos.filter((todo) => todo.id !== id));
    setIncompleteTodos(
      deletedTodo.completed ? incompleteTodos : incompleteTodos - 1
    );
  }

  function clearAllCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
    setIncompleteTodos(todos.filter((todo) => !todo.completed).length);
  }

  function allTodos() {
    setFilter("all");
  }

  function activeTodos() {
    setFilter("active");
  }

  function completedTodos() {
    setFilter("completed");
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
          {todos
            .filter((todo) => {
              if (filter === "all") return true;
              if (filter === "active") return !todo.completed;
              if (filter === "completed") return todo.completed;
            })
            .map((item) => (
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
                <button onClick={() => deleteTodo(item.id)} className="delete">
                  X
                </button>
              </li>
            ))}
        </ul>
        <footer className="">
          <span>{incompleteTodos} items left</span>
          <div className="footer-center">
            <span onClick={allTodos}>All</span>
            <span onClick={activeTodos}>Active</span>
            <span onClick={completedTodos}>Completed</span>
          </div>
          <span onClick={clearAllCompleted}>Clear Completed</span>
        </footer>
      </div>
    </header>
  );
};

export default Todos;
