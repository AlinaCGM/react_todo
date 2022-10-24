import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

const App = () => {
  const [show, setShow] = useState();

  const mainShow = () => {
    setShow(!show);
  };
  return (
    <div id="todo-list">
      {show ? (
        <div>
          <button onClick={mainShow}>Hide</button>

          <Todo />
        </div>
      ) : (
        <button onClick={mainShow}>Add a new todo</button>
      )}{" "}
    </div>
  );
};

export default App;
