import React from "react";

function TodoInput({ addTask, Task, setTask }) {
  return (
    <form onSubmit={addTask} className="TodoForm">
      <input
      className="todo-input"
        type="text"
        name="Task"
        value={Task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter The Task"
      />
      <button className="todo-btn" type="submit">Add</button>
    </form>
  );
}

export default TodoInput;
