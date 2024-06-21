import React from "react";
import { useUserIdContext } from "../context/UserContext";
import { useState } from "react";
import axios from "axios";
function TodoInput({getTasks}) {
  const [task, setTask] = useState("");

  const { UserId } = useUserIdContext();
  const addTask = async (event) => {
    event.preventDefault();
    if (task.trim() === "") {
      Toastify({
        text: "Can't add empty task",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
      return; // Correctly return here without additional semicolons
    }
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}api/addtask/${UserId}`,
        { text: task }, 
        {
          withCredentials: true,
        }
      )
      if (response.status === 201) {
        console.log("task added successfully")
        setTask("")
        getTasks()
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
    
  };
  return (
    <form onSubmit={addTask} className="TodoForm">
      <input
      className="todo-input"
        type="text"
        name="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter The Task"
      />
      <button className="todo-btn" type="submit">Add</button>
    </form>
  );
}

export default TodoInput;
