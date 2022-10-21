import React from "react";
import { useState } from "react";
import uuid from "react-uuid";

const Todo = () => {
  const [todo, setTodo] = useState({
    title: "",
    deadLine: "",
    status: "",
  });

  const [todos, setTodos] = useState([{}]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updateTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updateTodos);
      setEditId(0);
      setTodo({});
      return;
    }

    if (todo.value !== "") {
      setTodos([{ id: uuid(), todo }, ...todos]);
      setTodo({});
    }
  };

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((t) => t.id !== id);
    setTodos([...deleteTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  console.log(todo);
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={todo.title}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Deadline"
            value={todo.deadLine}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Status"
            value={todo.status}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div>
            <button className="btn" type="submit">
              {" "}
              Cancel
            </button>
            <button className="btn" type="submit">
              {editId ? "Edit" : "Add"}
            </button>
          </div>
        </form>

        <ul className="allTodos">
          {todos.map((id, value) => (
            <li className="singleTodo" key={id}>
              <span className="todoText">{value}</span>

              <button onClick={() => handleEdit(id)}>Edit</button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </li>
          ))}

          {/* {todos.map((t) => (
            <li className="singleTodo" key={t.id}>
              <span className="todoText">
                {`${t.title},${t.deadLine},${t.status}`}
              </span>

              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
