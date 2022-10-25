import React from "react";
import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState([]);
  const [editingDeadLine, setEditingDeadLine] = useState([]);
  const [editingStatus, setEditingStatus] = useState([]);
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
    setDeadline("");
    setStatus("");
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
        todo.status = editingStatus;
      }

      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  const options = [
    { value: "", text: "--Choose an option--" },
    { value: "apple", text: "Apple 🍏" },
    { value: "banana", text: "Banana 🍌" },
    { value: "kiwi", text: "Kiwi 🥝" },
  ];
  return (
    <div>
      {" "}
      <div id="todo-list">
        <form onSubmit={handleSubmit}>
          <p>Add new todo</p>
          <input
            className="input"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            placeholder="Title"
          />{" "}
          <input
            className="input"
            type="text"
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
            placeholder="Deadline"
          />{" "}
          <select
            className="input"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {options.value}
              </option>
            ))}
          </select>
          {/* <select
            className="input"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="">Status</option>
            <option value="Steak">Steak</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Dumpling">Dumpling</option>
          </select> */}
          {/* <div> {status}</div> */}
          <div className="btn">
            <button type="submit">Cancel</button>
            <button type="submit">Add</button>
          </div>
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
                  <select
                    value={status}
                    onChange={(e) => setEditingStatus(e.target.value)}
                  >
                    {options.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                  {/* <select
                    value={status}
                    onChange={(e) => setEditingStatus(e.target.value)}
                  >
                    <option value="">Status</option>
                    <option value="Steak">Steak</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Dumpling">Dumpling</option>
                  </select> */}
                </div>
              ) : (
                <div>
                  <p>{todo.text}</p>
                  <p>{"Deadline: " + todo.deadline}</p>
                  <p>{status}</p>
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
