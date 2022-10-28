import React from "react";
import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState([]);
  const [editingDeadLine, setEditingDeadLine] = useState([]);
  const [editingStatus, setEditingStatus] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      deadline: deadline,
      // completed: false,
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

  const handleCancel = () => {
    setTodo("");
    setDeadline("");
    setStatus("");
  };
  const options = [
    { value: "", text: "Status" },
    { value: "Done", text: "Done" },
    { value: "Not started", text: "Not started" },
    { value: "In progress", text: "In progress" },
  ];

  console.log(options);
  return (
    <div>
      {" "}
      <div id="todo-list">
        <div className="form">
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
              className="input "
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </form>
          <div className="btn">
            <button type="submit" onClick={handleCancel}>
              Cancel
            </button>

            <button type="submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <div className="todo-text">
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
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value)}
                  >
                    {options.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <p>{todo.text}</p>
                  <p className="deadline-text">
                    {"Deadline: " + todo.deadline}
                  </p>
                  {/* <p>{"Status: " + todo.status}</p> */}
                  {(() => {
                    if (todo.status === "Done") {
                      return (
                        <div
                          className="status"
                          style={{ backgroundColor: "#93C47D" }}
                        >
                          {/* {"Status: " + todo.status} */}
                        </div>
                      );
                    } else if (todo.status === "Not started") {
                      return (
                        <div
                          className="status"
                          style={{ backgroundColor: "#EA9999" }}
                        ></div>
                      );
                    } else {
                      return (
                        <div
                          className="status"
                          style={{ backgroundColor: "#FFE59A" }}
                        ></div>
                      );
                    }
                  })()}
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
      <div className="options-color">
        <span className="first-green">Done</span>
        <span className="second-pink">Not started</span>
        <span className="third-yellow">In progress</span>
      </div>
    </div>
  );
}

export default Todo;
