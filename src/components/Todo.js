import React from "react";
import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState(false);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState([]);
  const [editingDeadLine, setEditingDeadLine] = useState([]);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      deadline: deadline,
      completed: false,
      status: status,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
    //setDeadline([...todos].concat(newTodo));
    setDeadline("");
    console.log(newTodo);
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        todo.deadline = editingDeadLine;
      }

      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  console.log("here" + todo);

  // const showDropdown = () => {
  //   setStatus(true);
  // };
  // const hideDropdown = () => {
  //   setStatus(false);
  // };

  return (
    <div>
      {" "}
      <div id="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />{" "}
          <input
            className="input"
            type="text"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
          />
          {/* <div
            className="dropdown"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            {status ? (
              <ul className="dropdown-list" onMouseEnter={showDropdown}>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            ) : null}
          </div> */}
          <div>
            {" "}
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <button type="submit">Cancel</button>
          <button type="submit">Add</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {todo.id === todoEditing ? (
                <div>
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                    value={editingText}
                  />

                  <input
                    type="text"
                    onChange={(e) => setEditingDeadLine(e.target.value)}
                    value={editingDeadLine}
                  />
                </div>
              ) : (
                <div>
                  <p>{"Todo name: " + todo.text}</p>
                  <p>{"Todo deadline: " + todo.deadline}</p>
                </div>
              )}
            </div>
            <div className="todo-actions">
              {todo.id === todoEditing ? (
                <button onClick={() => submitEdits(todo.id)}>
                  Submit Edits
                </button>
              ) : (
                <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
              )}

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
