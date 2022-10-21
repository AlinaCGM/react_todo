import React, { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [show, setShow] = useState();

  const mainShow = () => {
    setShow(!show);
  };
  return (
    <div>
      <div>
        {show ? (
          <div>
            <button onClick={mainShow}>HIDE</button>

            <Todo />
          </div>
        ) : (
          <button onClick={mainShow}>SHOW</button>
        )}
      </div>
    </div>
  );
}

export default App;
